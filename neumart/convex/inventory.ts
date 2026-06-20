import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./helpers";

const STOCK_STATUS_VALIDATOR = v.union(
  v.literal("in_stock"),
  v.literal("low_stock"),
  v.literal("out_of_stock"),
);

function computeStockStatus(
  stockQuantity: number,
  lowStockThreshold: number | undefined,
): "in_stock" | "low_stock" | "out_of_stock" {
  const threshold = lowStockThreshold ?? 5;
  if (stockQuantity === 0) return "out_of_stock";
  if (stockQuantity <= threshold) return "low_stock";
  return "in_stock";
}

// ── Queries ───────────────────────────────────────────────────────────────────

export const adminGetInventoryProducts = query({
  args: {
    search: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    stockStatus: v.optional(STOCK_STATUS_VALIDATOR),
  },
  handler: async (ctx, { search, categoryId, stockStatus }) => {
    await assertAdmin(ctx);

    let products;

    if (search && search.trim()) {
      // Full-text search across all products (active and inactive)
      products = await ctx.db
        .query("products")
        .withSearchIndex("search_by_name", (q) => q.search("name", search))
        .take(100);
    } else if (categoryId) {
      products = await ctx.db
        .query("products")
        .withIndex("by_categoryId", (q) => q.eq("categoryId", categoryId))
        .order("desc")
        .take(300);
    } else {
      products = await ctx.db.query("products").order("desc").take(500);
    }

    // Enrich with category name
    const uniqueCategoryIds = [...new Set(products.map((p) => p.categoryId))];
    const categories = await Promise.all(
      uniqueCategoryIds.map((id) => ctx.db.get(id)),
    );
    const categoryMap = new Map(
      categories.filter(Boolean).map((c) => [c!._id, c!.name]),
    );

    const enriched = products.map((p) => ({
      ...p,
      categoryName: categoryMap.get(p.categoryId) ?? null,
      stockStatus: computeStockStatus(p.stockQuantity, p.lowStockThreshold),
    }));

    if (stockStatus) {
      return enriched.filter((p) => p.stockStatus === stockStatus);
    }
    return enriched;
  },
});

export const adminGetLowStockProducts = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    const products = await ctx.db.query("products").order("desc").take(500);
    return products.filter((p) => {
      const threshold = p.lowStockThreshold ?? 5;
      return p.stockQuantity === 0 || p.stockQuantity <= threshold;
    });
  },
});

export const adminGetStockMovements = query({
  args: {
    productId: v.optional(v.id("products")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { productId, limit = 50 }) => {
    await assertAdmin(ctx);

    if (productId) {
      return ctx.db
        .query("stockMovements")
        .withIndex("by_productId_and_createdAt", (q) =>
          q.eq("productId", productId),
        )
        .order("desc")
        .take(limit);
    }

    return ctx.db.query("stockMovements").order("desc").take(limit);
  },
});

export const adminGetInventoryStats = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);

    // Take active products for stats
    const products = await ctx.db
      .query("products")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .take(1000);

    let totalStock = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    for (const p of products) {
      totalStock += p.stockQuantity;
      const status = computeStockStatus(p.stockQuantity, p.lowStockThreshold);
      if (status === "out_of_stock") outOfStockCount++;
      else if (status === "low_stock") lowStockCount++;
    }

    return {
      totalActiveProducts: products.length,
      totalStock,
      lowStockCount,
      outOfStockCount,
    };
  },
});

// ── Mutations ─────────────────────────────────────────────────────────────────

export const adminAdjustStock = mutation({
  args: {
    productId: v.id("products"),
    adjustmentType: v.union(
      v.literal("restock"),
      v.literal("deduct"),
      v.literal("correction"),
    ),
    quantity: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, { productId, adjustmentType, quantity, reason }) => {
    const identity = await ctx.auth.getUserIdentity();
    await assertAdmin(ctx);

    if (!reason.trim()) throw new ConvexError("Reason is required");

    const product = await ctx.db.get(productId);
    if (!product) throw new ConvexError("Product not found");

    const previousStock = product.stockQuantity;
    let newStock: number;
    let quantityChange: number;
    let movementType: "restock" | "manual_adjustment" | "stock_correction";

    if (adjustmentType === "restock") {
      if (quantity <= 0) throw new ConvexError("Quantity must be positive");
      newStock = previousStock + quantity;
      quantityChange = quantity;
      movementType = "restock";
    } else if (adjustmentType === "deduct") {
      if (quantity <= 0) throw new ConvexError("Quantity must be positive");
      if (previousStock - quantity < 0) {
        throw new ConvexError(
          `Cannot deduct ${quantity} — only ${previousStock} in stock`,
        );
      }
      newStock = previousStock - quantity;
      quantityChange = -quantity;
      movementType = "manual_adjustment";
    } else {
      // correction: set to exact value
      if (quantity < 0) throw new ConvexError("Stock cannot be negative");
      newStock = quantity;
      quantityChange = quantity - previousStock;
      movementType = "stock_correction";
    }

    const now = Date.now();

    await ctx.db.patch(productId, {
      stockQuantity: newStock,
      updatedAt: now,
      lastStockUpdatedAt: now,
    });

    await ctx.db.insert("stockMovements", {
      productId,
      type: movementType,
      quantityChange,
      previousStock,
      newStock,
      reason: reason.trim(),
      referenceType: "manual",
      createdBy: identity?.tokenIdentifier ?? "unknown",
      createdAt: now,
    });
  },
});
