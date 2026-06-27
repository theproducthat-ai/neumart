import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(v.string()), // "admin" | "customer"
    createdAt: v.number(),
    customerCode: v.optional(v.string()),
    qrCodeId: v.optional(v.string()),
    qrEnabled: v.optional(v.boolean()),
    qrCreatedAt: v.optional(v.number()),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_qr_code_id", ["qrCodeId"]),

  addresses: defineTable({
    userId: v.id("users"),
    name: v.string(),       // recipient full name
    phone: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    landmark: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    country: v.optional(v.string()),
    isDefault: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_isDefault", ["userId", "isDefault"]),

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
    unit: v.string(),  // e.g. "500g", "1L", "6 pcs"
    imageUrl: v.optional(v.string()),
    stockQuantity: v.number(),
    lowStockThreshold: v.optional(v.number()), // default treated as 5 in UI/logic
    isActive: v.boolean(),
    isFeatured: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
    lastStockUpdatedAt: v.optional(v.number()),
    ingredients: v.optional(v.string()),
    containsAllergens: v.optional(v.array(v.string())),
    mayContainAllergens: v.optional(v.array(v.string())),
    dietaryTags: v.optional(v.array(v.string())),
    allergenNotes: v.optional(v.string()),
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

  coupons: defineTable({
    code: v.string(),
    discountType: v.string(),
    discountValue: v.number(),
    minimumOrderValue: v.optional(v.number()),
    maximumDiscount: v.optional(v.number()),
    usageLimit: v.optional(v.number()),
    perUserLimit: v.optional(v.number()),
    startsAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_isActive", ["isActive"]),

  couponUsages: defineTable({
    couponId: v.id("coupons"),
    userId: v.id("users"),
    orderId: v.id("orders"),
    discountAmount: v.number(),
    createdAt: v.number(),
  })
    .index("by_couponId", ["couponId"])
    .index("by_couponId_and_userId", ["couponId", "userId"]),

  orders: defineTable({
    userId: v.id("users"),
    addressId: v.id("addresses"),
    orderNumber: v.string(),       // e.g. "NM-20260620-432800"
    status: v.union(
      v.literal("placed"),
      v.literal("confirmed"),
      v.literal("preparing"),
      v.literal("out_for_delivery"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    paymentMethod: v.string(),     // "pay_later", "razorpay", etc.
    subtotal: v.number(),          // paise
    deliveryFee: v.number(),       // paise
    total: v.number(),             // paise (subtotal - discountAmount + deliveryFee)
    currency: v.string(),          // "INR"
    itemCount: v.number(),
    notes: v.optional(v.string()),
    // Coupon fields — optional, only set when a coupon was applied
    discountAmount: v.optional(v.number()),
    couponId: v.optional(v.id("coupons")),
    couponCodeSnapshot: v.optional(v.string()),
    couponDiscountTypeSnapshot: v.optional(v.string()),
    couponDiscountValueSnapshot: v.optional(v.number()),
    couponMaxDiscountSnapshot: v.optional(v.number()),
    couponAppliedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_orderNumber", ["orderNumber"])
    .index("by_status", ["status", "createdAt"])
    .index("by_paymentStatus", ["paymentStatus", "createdAt"])
    .index("by_status_paymentStatus", ["status", "paymentStatus", "createdAt"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    productNameSnapshot: v.string(),
    productImageSnapshot: v.optional(v.string()),
    unitSnapshot: v.string(),
    priceSnapshot: v.number(),     // paise at time of order
    quantity: v.number(),
    lineTotal: v.number(),         // paise (priceSnapshot × quantity)
    createdAt: v.number(),
  }).index("by_orderId", ["orderId"]),

  stockMovements: defineTable({
    productId: v.id("products"),
    type: v.union(
      v.literal("order_placed"),
      v.literal("manual_adjustment"),
      v.literal("restock"),
      v.literal("stock_correction"),
    ),
    quantityChange: v.number(), // negative for deductions
    previousStock: v.number(),
    newStock: v.number(),
    reason: v.string(),
    referenceType: v.optional(v.union(v.literal("order"), v.literal("manual"))),
    referenceId: v.optional(v.string()), // orderId or manual note
    createdBy: v.string(),              // tokenIdentifier or userId string
    createdAt: v.number(),
  })
    .index("by_productId", ["productId"])
    .index("by_productId_and_createdAt", ["productId", "createdAt"]),

  payments: defineTable({
    orderId: v.id("orders"),
    userId: v.id("users"),
    method: v.string(),            // "pay_later", "razorpay"
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    amount: v.number(),            // paise
    currency: v.string(),          // "INR"
    // Gateway fields — all optional, populated when Razorpay is added
    gatewayOrderId: v.optional(v.string()),
    gatewayPaymentId: v.optional(v.string()),
    gatewaySignature: v.optional(v.string()),
    webhookVerified: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_userId", ["userId"]),

  deliveryTasks: defineTable({
    orderId: v.id("orders"),
    userId: v.id("users"),
    addressId: v.id("addresses"),
    status: v.union(
      v.literal("pending"),
      v.literal("assigned"),
      v.literal("picked_up"),
      v.literal("out_for_delivery"),
      v.literal("delivered"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    assignedTo: v.optional(v.string()),
    assignedContact: v.optional(v.string()),
    assignedAt: v.optional(v.number()),
    pickedUpAt: v.optional(v.number()),
    outForDeliveryAt: v.optional(v.number()),
    deliveredAt: v.optional(v.number()),
    failedAt: v.optional(v.number()),
    failedReasonCode: v.optional(v.union(
      v.literal("customer_unavailable"),
      v.literal("wrong_address"),
      v.literal("customer_refused"),
      v.literal("delivery_person_unavailable"),
      v.literal("order_damaged"),
      v.literal("payment_issue"),
      v.literal("unable_to_contact"),
      v.literal("other")
    )),
    failedReasonNotes: v.optional(v.string()),
    cancelledAt: v.optional(v.number()),
    cancelledReason: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    updatedBy: v.id("users"),
  }).index("by_orderId", ["orderId"]),
});
