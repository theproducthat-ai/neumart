"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { CouponInputField } from "@/components/cart/CouponInputField";
import { DiscountLineItem } from "@/components/cart/DiscountLineItem";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { isAuthenticated } = useConvexAuth();
  const { items, updateQuantity, removeItem, appliedCoupon } = useCartStore();
  const hasAddr = useQuery(api.addresses.hasAddress, isAuthenticated ? {} : "skip");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const discountAmount = appliedCoupon?.discountAmount ?? 0;
  const displayTotal = subtotal - discountAmount;

  function handleCheckout() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    if (!hasAddr) {
      router.push("/addresses/new");
      return;
    }
    router.push("/checkout");
  }

  const checkoutLoading = isAuthenticated && hasAddr === undefined;

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-6 text-muted-foreground">
          Browse our products and add something you like.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Your Cart{" "}
        <span className="text-lg font-normal text-muted-foreground">
          ({totalItems} item{totalItems !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-lg border p-4"
          >
            {/* Thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Info + controls */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold leading-tight">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                </div>
                {/* Remove — visible on all sizes */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.productId)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>

              <div className="flex items-center justify-between gap-2">
                {/* Quantity controls */}
                <div className="flex items-center gap-1 rounded-md border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Line total */}
                <p className="font-bold">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                {formatCurrency(item.price)} each
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Coupon input */}
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium">Have a coupon?</p>
        <CouponInputField subtotal={subtotal} />
      </div>

      {/* Summary + checkout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-lg font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          {appliedCoupon && (
            <DiscountLineItem
              code={appliedCoupon.code}
              discountAmount={appliedCoupon.discountAmount}
            />
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-muted-foreground">Cart total</span>
            <span className="text-2xl font-bold">{formatCurrency(displayTotal)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Delivery charges calculated at checkout.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Loading…" : "Proceed to checkout"}
          </Button>
          {isAuthenticated && hasAddr === false && (
            <p className="text-xs text-muted-foreground">
              You&apos;ll need to add a delivery address first.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
