"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ShoppingCart, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { isAuthenticated } = useConvexAuth();
  const { items, updateQuantity, removeItem } = useCartStore();
  const hasAddr = useQuery(api.addresses.hasAddress, isAuthenticated ? {} : "skip");

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

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
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-6 text-muted-foreground">
          Add some products to get started.
        </p>
        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Your Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
      </h1>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 rounded-lg border p-4"
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

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.unit}</p>
              <p className="text-sm font-medium">
                ₹{(item.price / 100).toFixed(2)} each
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              >
                −
              </Button>
              <span className="w-8 text-center text-sm font-semibold">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              >
                +
              </Button>
            </div>

            {/* Subtotal + remove */}
            <div className="shrink-0 text-right">
              <p className="font-bold">
                ₹{((item.price * item.quantity) / 100).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 text-destructive hover:text-destructive"
                onClick={() => removeItem(item.productId)}
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Summary */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl font-bold">
            Total: ₹{(total / 100).toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Delivery charges will be calculated at checkout.
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
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
              You need a delivery address to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
