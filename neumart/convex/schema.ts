import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  addresses: defineTable({
    userId: v.id("users"),
    name: v.string(),
    phone: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    isDefault: v.boolean(),
  }).index("by_userId", ["userId"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_isActive", ["isActive"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    categoryId: v.id("categories"),
    price: v.number(), // stored in paise (₹1 = 100 paise)
    unit: v.string(), // e.g. "500g", "1L", "6 pcs"
    imageUrl: v.optional(v.string()),
    stockQuantity: v.number(),
    isActive: v.boolean(),
    isFeatured: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_categoryId", ["categoryId"])
    .index("by_slug", ["slug"])
    .index("by_isActive", ["isActive"])
    .searchIndex("search_by_name", {
      searchField: "name",
      filterFields: ["isActive"],
    }),

  favourites: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_productId", ["userId", "productId"]),

  orders: defineTable({
    userId: v.id("users"),
    addressId: v.id("addresses"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    subtotal: v.number(), // paise
    deliveryFee: v.number(), // paise
    total: v.number(), // paise
    razorpayOrderId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_razorpayOrderId", ["razorpayOrderId"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    productName: v.string(), // snapshot at time of order
    price: v.number(), // paise snapshot
    quantity: v.number(),
  }).index("by_orderId", ["orderId"]),

  payments: defineTable({
    orderId: v.id("orders"),
    userId: v.id("users"),
    razorpayOrderId: v.string(),
    razorpayPaymentId: v.optional(v.string()),
    razorpaySignature: v.optional(v.string()),
    status: v.union(
      v.literal("created"),
      v.literal("paid"),
      v.literal("failed")
    ),
    amount: v.number(), // paise
    webhookVerified: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_razorpayOrderId", ["razorpayOrderId"]),
});
