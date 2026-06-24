// ─────────────────────────────────────────────────────────────────────────────
// DEVELOPMENT ONLY — Seed data for local development and demo environments.
// Run via: npx convex run seed:seedDevelopmentData
// Safe to run multiple times — skips individual slugs that already exist,
// so partial data is completed rather than aborted.
// No auth guard: CLI access to the Convex project is the access control here.
// ─────────────────────────────────────────────────────────────────────────────

import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";

// Returns the existing category ID if the slug is taken, otherwise inserts and returns the new ID.
async function upsertCategory(
  ctx: MutationCtx,
  fields: {
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: number;
    updatedAt: number;
  }
): Promise<Id<"categories">> {
  const existing = await ctx.db
    .query("categories")
    .withIndex("by_slug", (q) => q.eq("slug", fields.slug))
    .unique();
  if (existing) return existing._id;
  return ctx.db.insert("categories", fields);
}

// Inserts a product only if its slug doesn't already exist.
async function upsertProduct(
  ctx: MutationCtx,
  fields: {
    name: string;
    slug: string;
    description: string;
    categoryId: Id<"categories">;
    price: number;
    unit: string;
    stockQuantity: number;
    lowStockThreshold: number;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: number;
    updatedAt: number;
  }
): Promise<boolean> {
  const existing = await ctx.db
    .query("products")
    .withIndex("by_slug", (q) => q.eq("slug", fields.slug))
    .unique();
  if (existing) return false;
  await ctx.db.insert("products", fields);
  return true;
}

export const seedDevelopmentData = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // ── Categories ───────────────────────────────────────────────────────────

    const fruitsId = await upsertCategory(ctx, {
      name: "Fruits",
      slug: "fruits",
      description: "Fresh seasonal and exotic fruits",
      isActive: true,
      sortOrder: 1,
      createdAt: now,
      updatedAt: now,
    });

    const vegetablesId = await upsertCategory(ctx, {
      name: "Vegetables",
      slug: "vegetables",
      description: "Farm-fresh vegetables delivered daily",
      isActive: true,
      sortOrder: 2,
      createdAt: now,
      updatedAt: now,
    });

    const dairyId = await upsertCategory(ctx, {
      name: "Dairy",
      slug: "dairy",
      description: "Milk, paneer, curd, butter and more",
      isActive: true,
      sortOrder: 3,
      createdAt: now,
      updatedAt: now,
    });

    const bakeryId = await upsertCategory(ctx, {
      name: "Bakery",
      slug: "bakery",
      description: "Breads, rolls and baked goods",
      isActive: true,
      sortOrder: 4,
      createdAt: now,
      updatedAt: now,
    });

    const beveragesId = await upsertCategory(ctx, {
      name: "Beverages",
      slug: "beverages",
      description: "Water, juices, tea, coffee and more",
      isActive: true,
      sortOrder: 5,
      createdAt: now,
      updatedAt: now,
    });

    const snacksId = await upsertCategory(ctx, {
      name: "Snacks",
      slug: "snacks",
      description: "Chips, biscuits, nuts and light bites",
      isActive: true,
      sortOrder: 6,
      createdAt: now,
      updatedAt: now,
    });

    const staplesId = await upsertCategory(ctx, {
      name: "Staples",
      slug: "staples",
      description: "Rice, dal, atta, oil and pantry essentials",
      isActive: true,
      sortOrder: 7,
      createdAt: now,
      updatedAt: now,
    });

    const householdId = await upsertCategory(ctx, {
      name: "Household",
      slug: "household",
      description: "Cleaning supplies and home essentials",
      isActive: true,
      sortOrder: 8,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Fruits (5) ────────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Bananas",
      slug: "bananas",
      description: "Sweet and ripe Robusta bananas. Great for breakfast or as a quick snack.",
      categoryId: fruitsId,
      price: 4500,
      unit: "1 dozen",
      stockQuantity: 80,
      lowStockThreshold: 15,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Shimla Apples",
      slug: "shimla-apples",
      description: "Crisp and juicy apples from Himachal Pradesh. Rich in fibre and vitamins.",
      categoryId: fruitsId,
      price: 12000,
      unit: "500g",
      stockQuantity: 60,
      lowStockThreshold: 10,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Alphonso Mangoes",
      slug: "alphonso-mangoes",
      description: "Premium Alphonso mangoes from Ratnagiri. The king of fruits.",
      categoryId: fruitsId,
      price: 18000,
      unit: "500g",
      stockQuantity: 40,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Oranges",
      slug: "oranges",
      description: "Juicy Nagpur oranges. Excellent source of Vitamin C.",
      categoryId: fruitsId,
      price: 6000,
      unit: "500g",
      stockQuantity: 70,
      lowStockThreshold: 12,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Watermelon",
      slug: "watermelon",
      description: "Sweet and refreshing seedless watermelon. Perfect for summer.",
      categoryId: fruitsId,
      price: 5000,
      unit: "per piece (~2kg)",
      stockQuantity: 30,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Vegetables (5) ────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Tomatoes",
      slug: "tomatoes",
      description: "Fresh red tomatoes. Ideal for curries, salads and chutneys.",
      categoryId: vegetablesId,
      price: 3500,
      unit: "500g",
      stockQuantity: 100,
      lowStockThreshold: 20,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Potatoes",
      slug: "potatoes",
      description: "Farm-fresh potatoes. A kitchen essential for all Indian cooking.",
      categoryId: vegetablesId,
      price: 2500,
      unit: "1kg",
      stockQuantity: 120,
      lowStockThreshold: 25,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Onions",
      slug: "onions",
      description: "Fresh onions, a staple in every Indian kitchen.",
      categoryId: vegetablesId,
      price: 3000,
      unit: "1kg",
      stockQuantity: 100,
      lowStockThreshold: 20,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Palak (Spinach)",
      slug: "palak-spinach",
      description: "Fresh green spinach leaves. Rich in iron and vitamins.",
      categoryId: vegetablesId,
      price: 2000,
      unit: "250g",
      stockQuantity: 50,
      lowStockThreshold: 10,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Cauliflower",
      slug: "cauliflower",
      description: "Tender white cauliflower, perfect for sabzi and soups.",
      categoryId: vegetablesId,
      price: 4000,
      unit: "per piece",
      stockQuantity: 45,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Dairy (4) ─────────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Full Cream Milk",
      slug: "full-cream-milk",
      description: "Fresh full cream milk. Pasteurised and homogenised.",
      categoryId: dairyId,
      price: 2800,
      unit: "500ml",
      stockQuantity: 90,
      lowStockThreshold: 20,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Fresh Paneer",
      slug: "fresh-paneer",
      description: "Soft and creamy fresh paneer. Made daily from whole milk.",
      categoryId: dairyId,
      price: 9000,
      unit: "200g",
      stockQuantity: 40,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Curd",
      slug: "curd",
      description: "Thick set curd. Probiotic-rich and great with every meal.",
      categoryId: dairyId,
      price: 3500,
      unit: "400g",
      stockQuantity: 60,
      lowStockThreshold: 12,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Amul Butter",
      slug: "amul-butter",
      description: "Salted butter. Perfect for spreading, cooking and baking.",
      categoryId: dairyId,
      price: 5500,
      unit: "100g",
      stockQuantity: 50,
      lowStockThreshold: 10,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Bakery (4) ────────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "White Sandwich Bread",
      slug: "white-sandwich-bread",
      description: "Soft white bread, pre-sliced. Great for sandwiches and toast.",
      categoryId: bakeryId,
      price: 4500,
      unit: "400g loaf",
      stockQuantity: 35,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Brown Bread",
      slug: "brown-bread",
      description: "Wholesome brown bread with added fibre. A healthier choice.",
      categoryId: bakeryId,
      price: 5000,
      unit: "400g loaf",
      stockQuantity: 30,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Dinner Rolls",
      slug: "dinner-rolls",
      description: "Soft, pillowy dinner rolls. Freshly baked every morning.",
      categoryId: bakeryId,
      price: 4000,
      unit: "6 pieces",
      stockQuantity: 25,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Butter Croissants",
      slug: "butter-croissants",
      description: "Flaky, golden croissants made with real butter. Baked fresh daily.",
      categoryId: bakeryId,
      price: 12000,
      unit: "4 pieces",
      stockQuantity: 20,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Beverages (4) ─────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Mineral Water",
      slug: "mineral-water-1l",
      description: "Natural mineral water. Pure and refreshing.",
      categoryId: beveragesId,
      price: 2000,
      unit: "1L bottle",
      stockQuantity: 150,
      lowStockThreshold: 30,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Fresh Orange Juice",
      slug: "fresh-orange-juice",
      description: "Cold-pressed orange juice with no added sugar or preservatives.",
      categoryId: beveragesId,
      price: 8000,
      unit: "1L",
      stockQuantity: 40,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Arabica Ground Coffee",
      slug: "arabica-ground-coffee",
      description: "Medium roast 100% Arabica ground coffee. Rich, smooth flavour.",
      categoryId: beveragesId,
      price: 25000,
      unit: "200g",
      stockQuantity: 25,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Green Tea",
      slug: "green-tea",
      description: "Premium Darjeeling green tea leaves. Antioxidant-rich and refreshing.",
      categoryId: beveragesId,
      price: 15000,
      unit: "50g",
      stockQuantity: 30,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Snacks (4) ────────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Salted Almonds",
      slug: "salted-almonds",
      description: "Premium roasted almonds with a light salt seasoning.",
      categoryId: snacksId,
      price: 19900,
      unit: "200g",
      stockQuantity: 40,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Classic Potato Chips",
      slug: "classic-potato-chips",
      description: "Thin, crispy salted potato chips. Ideal tea-time snack.",
      categoryId: snacksId,
      price: 2000,
      unit: "45g",
      stockQuantity: 100,
      lowStockThreshold: 20,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Mixed Namkeen",
      slug: "mixed-namkeen",
      description: "Assorted savoury snack mix with sev, peanuts and dal moth.",
      categoryId: snacksId,
      price: 5500,
      unit: "200g",
      stockQuantity: 55,
      lowStockThreshold: 10,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Digestive Biscuits",
      slug: "digestive-biscuits",
      description: "Wholesome wheat biscuits with a light sweet flavour.",
      categoryId: snacksId,
      price: 4000,
      unit: "400g",
      stockQuantity: 60,
      lowStockThreshold: 12,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Staples (5) ───────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Basmati Rice",
      slug: "basmati-rice",
      description: "Aged extra-long grain basmati rice. Aromatic and fluffy.",
      categoryId: staplesId,
      price: 13000,
      unit: "1kg",
      stockQuantity: 80,
      lowStockThreshold: 15,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Toor Dal",
      slug: "toor-dal",
      description: "Premium split pigeon peas. The base of every good dal tadka.",
      categoryId: staplesId,
      price: 11000,
      unit: "1kg",
      stockQuantity: 70,
      lowStockThreshold: 15,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Sunflower Oil",
      slug: "sunflower-oil-1l",
      description: "Refined sunflower oil. Light, cholesterol-free cooking oil.",
      categoryId: staplesId,
      price: 15500,
      unit: "1L",
      stockQuantity: 60,
      lowStockThreshold: 12,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Whole Wheat Atta",
      slug: "whole-wheat-atta",
      description: "Stone-ground whole wheat flour. For soft, nutritious rotis.",
      categoryId: staplesId,
      price: 6500,
      unit: "1kg",
      stockQuantity: 90,
      lowStockThreshold: 20,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Moong Dal",
      slug: "moong-dal",
      description: "Split yellow moong lentils. Quick to cook and easy to digest.",
      categoryId: staplesId,
      price: 12000,
      unit: "1kg",
      stockQuantity: 65,
      lowStockThreshold: 12,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // ── Products — Household (5) ─────────────────────────────────────────────

    await upsertProduct(ctx, {
      name: "Dish Wash Liquid",
      slug: "dish-wash-liquid",
      description: "Tough on grease, gentle on hands. Lemon fragrance.",
      categoryId: householdId,
      price: 9900,
      unit: "500ml",
      stockQuantity: 45,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Floor Cleaner",
      slug: "floor-cleaner",
      description: "Disinfectant floor cleaner with pine fragrance. Kills 99.9% germs.",
      categoryId: householdId,
      price: 12000,
      unit: "1L",
      stockQuantity: 35,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Laundry Detergent",
      slug: "laundry-detergent",
      description: "Front-load safe laundry detergent. Removes tough stains.",
      categoryId: householdId,
      price: 19900,
      unit: "1kg",
      stockQuantity: 30,
      lowStockThreshold: 6,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Toilet Cleaner",
      slug: "toilet-cleaner",
      description: "Thick gel toilet cleaner with descaling action.",
      categoryId: householdId,
      price: 8500,
      unit: "500ml",
      stockQuantity: 40,
      lowStockThreshold: 8,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await upsertProduct(ctx, {
      name: "Garbage Bags",
      slug: "garbage-bags",
      description: "Biodegradable garbage bags. Fits standard bins.",
      categoryId: householdId,
      price: 5500,
      unit: "30 pieces",
      stockQuantity: 50,
      lowStockThreshold: 10,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    return {
      message: "Seed complete",
      note: "Existing slugs were skipped. Check /products and /admin/categories to verify.",
    };
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// ALLERGEN SEED — Patches existing products with allergen and ingredient data.
// Run via: npx convex run seed:seedAllergenData
// Safe to run multiple times — patch is idempotent.
// ─────────────────────────────────────────────────────────────────────────────

const ALLERGEN_DATA: Record<string, {
  ingredients?: string;
  containsAllergens?: string[];
  mayContainAllergens?: string[];
  dietaryTags?: string[];
  allergenNotes?: string;
}> = {
  "white-sandwich-bread": {
    ingredients: "Wheat flour, water, sugar, yeast, edible vegetable oil (palm), salt, soy flour, emulsifier (E472e), preservative (E282).",
    containsAllergens: ["Wheat", "Gluten", "Soy"],
    mayContainAllergens: ["Sesame", "Egg", "Milk"],
    dietaryTags: ["Vegetarian"],
    allergenNotes: "Produced in a facility that handles sesame, eggs and milk.",
  },
  "brown-bread": {
    ingredients: "Whole wheat flour, water, sugar, yeast, wheat bran, edible vegetable oil (palm), salt, emulsifier (E472e), preservative (E282).",
    containsAllergens: ["Wheat", "Gluten"],
    mayContainAllergens: ["Soy", "Sesame"],
    dietaryTags: ["Vegetarian"],
  },
  "butter-croissants": {
    ingredients: "Refined wheat flour, butter (milk), sugar, eggs, yeast, salt, water.",
    containsAllergens: ["Wheat", "Gluten", "Milk", "Egg"],
    dietaryTags: ["Vegetarian"],
    allergenNotes: "Contains real butter. Not suitable for those with dairy or egg allergies.",
  },
  "digestive-biscuits": {
    ingredients: "Whole wheat flour, sugar, edible vegetable oil (palm), oatmeal, malt extract (wheat), raising agents (E500ii, E503ii), salt.",
    containsAllergens: ["Wheat", "Gluten"],
    mayContainAllergens: ["Milk", "Egg", "Soy", "Tree nuts"],
    dietaryTags: ["Vegetarian"],
  },
  "fresh-paneer": {
    ingredients: "Pasteurised whole cow's milk, food acid (acetic acid or citric acid).",
    containsAllergens: ["Milk"],
    dietaryTags: ["Vegetarian", "Jain-friendly", "Gluten-free"],
    allergenNotes: "100% dairy. Not suitable for those with lactose intolerance or milk allergy.",
  },
  "amul-butter": {
    ingredients: "Pasteurised cream (milk), common salt.",
    containsAllergens: ["Milk"],
    dietaryTags: ["Vegetarian", "Gluten-free"],
  },
  "salted-almonds": {
    ingredients: "Almonds, refined sunflower oil, iodised salt.",
    containsAllergens: ["Tree nuts"],
    mayContainAllergens: ["Peanuts"],
    dietaryTags: ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free"],
    allergenNotes: "Packed in a facility that also handles peanuts.",
  },
  "mixed-namkeen": {
    ingredients: "Chickpea flour (besan), peanuts, edible vegetable oil (palm), rice flakes, wheat sev, salt, spices (turmeric, red chilli, coriander).",
    containsAllergens: ["Peanuts", "Wheat", "Gluten"],
    mayContainAllergens: ["Tree nuts", "Sesame", "Mustard"],
    dietaryTags: ["Vegetarian", "Jain-friendly"],
  },
};

export const seedAllergenData = mutation({
  args: {},
  handler: async (ctx) => {
    let patched = 0;
    let skipped = 0;

    for (const [slug, allergenFields] of Object.entries(ALLERGEN_DATA)) {
      const product = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique();

      if (!product) {
        skipped++;
        continue;
      }

      await ctx.db.patch(product._id, {
        ...allergenFields,
        updatedAt: Date.now(),
      });
      patched++;
    }

    return {
      message: `Allergen seed complete. ${patched} products patched, ${skipped} slugs not found.`,
    };
  },
});
