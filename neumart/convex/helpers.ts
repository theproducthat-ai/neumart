import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export async function getOrCreateUser(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("Unauthenticated");

  const existing = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .unique();

  if (existing !== null) return existing;

  const allUsers = await ctx.db.query("users").collect();
  const seq = String(allUsers.length + 1).padStart(6, "0");
  const customerCode = `CUST-${seq}`;
  const qrCodeId = crypto.randomUUID();

  const id = await ctx.db.insert("users", {
    tokenIdentifier: identity.tokenIdentifier,
    email: identity.email ?? "",
    name: identity.name,
    createdAt: Date.now(),
    customerCode,
    qrCodeId,
    qrEnabled: true,
    qrCreatedAt: Date.now(),
  });

  return (await ctx.db.get(id))!;
}

export async function requireCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("Unauthenticated");

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .unique();

  if (!user) throw new ConvexError("User not found. Please sign in again.");
  return user;
}

export async function assertAdmin(ctx: QueryCtx | MutationCtx): Promise<void> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("Unauthenticated");

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .unique();

  if (!user || user.role !== "admin") {
    throw new ConvexError("Forbidden: admin only");
  }
}
