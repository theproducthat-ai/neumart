import { ConvexError } from "convex/values";
import type { UserIdentity } from "convex/server";
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

  const id = await ctx.db.insert("users", {
    tokenIdentifier: identity.tokenIdentifier,
    email: identity.email ?? "",
    name: identity.name,
    createdAt: Date.now(),
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

export function assertAdmin(identity: UserIdentity): void {
  // Requires Clerk JWT template: { "metadata": "{{user.public_metadata}}" }
  const metadata = (identity as unknown as { metadata?: { role?: string } })
    .metadata;
  if (metadata?.role !== "admin") {
    throw new ConvexError("Forbidden: admin only");
  }
}
