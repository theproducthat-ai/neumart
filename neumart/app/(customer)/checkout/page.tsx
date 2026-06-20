"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/store/cart-store";
import { Package, MapPin, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();
  const { items, clearCart } = useCartStore();
  const [placing, setPlacing] = useState(false);

  const defaultAddress = useQuery(
    api.addresses.getDefaultAddress,
    isAuthenticated ? {} : "skip"
  );
  const placeOrder = useMutation(api.orders.placeOrderWithoutPayment);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  async function handlePlaceOrder() {
    if (!defaultAddress) {
      toast.error("Please add a delivery address before placing your order.");
      return;
    }

    setPlacing(true);
    try {
      const orderId = await placeOrder({
        addressId: defaultAddress._id as Id<"addresses">,
        items: items.map((i) => ({
          productId: i.productId as Id<"products">,
          quantity: i.quantity,
        })),
      });

      clearCart();
      router.push(`/orders/${orderId}?placed=1`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to place order";
      toast.error(msg);
      setPlacing(false);
    }
  }

  const canPlaceOrder = !!defaultAddress && items.length > 0 && !placing;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
        <Link href="/cart">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to cart
        </Link>
      </Button>

      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left – order items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg">
            Your items ({totalItems})
          </h2>

          <div className="rounded-lg border divide-y">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × ₹{(item.price / 100).toFixed(2)}
                  </p>
                  <p className="font-semibold">
                    ₹{((item.price * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – summary + address + action */}
        <div className="space-y-5">
          {/* Order summary */}
          <div className="rounded-lg border p-5 space-y-3">
            <h2 className="font-semibold">Order summary</h2>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
              </span>
              <span>₹{(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{(total / 100).toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery address */}
          <div className="rounded-lg border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Delivery address</h2>
              <Button variant="ghost" size="sm" asChild className="h-auto p-0 text-sm">
                <Link href="/addresses">
                  {defaultAddress ? "Change" : "Add"}
                </Link>
              </Button>
            </div>
            <Separator />

            {defaultAddress === undefined ? (
              <Skeleton className="h-20 w-full" />
            ) : defaultAddress === null ? (
              <div className="flex flex-col items-center py-4 text-center">
                <MapPin className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="mb-3 text-sm text-muted-foreground">
                  No delivery address saved.
                </p>
                <Button size="sm" asChild>
                  <Link href="/addresses/new">Add address</Link>
                </Button>
              </div>
            ) : (
              <div className="text-sm space-y-0.5">
                <p className="font-medium">{defaultAddress.name}</p>
                <p className="text-muted-foreground">{defaultAddress.phone}</p>
                <p className="text-muted-foreground">
                  {defaultAddress.line1}
                  {defaultAddress.line2 ? `, ${defaultAddress.line2}` : ""}
                </p>
                {defaultAddress.landmark && (
                  <p className="text-muted-foreground">
                    Near {defaultAddress.landmark}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {defaultAddress.city}, {defaultAddress.state} — {defaultAddress.pincode}
                </p>
              </div>
            )}
          </div>

          {/* Place order */}
          <Button
            className="w-full"
            size="lg"
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder || defaultAddress === undefined}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {placing ? "Placing order…" : "Place Order"}
          </Button>

          {defaultAddress === null && (
            <p className="text-center text-xs text-muted-foreground">
              Add a delivery address to place your order.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
