"use client";

import Image from "next/image";
import Link from "next/link";
import { use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  CheckCircle2,
  Package,
  MapPin,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ORDER_STATUS_LABELS: Record<string, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const ORDER_STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  placed: "default",
  confirmed: "default",
  preparing: "secondary",
  out_for_delivery: "secondary",
  delivered: "outline",
  cancelled: "destructive",
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  pay_later: "Pay on Delivery",
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Skeleton className="mb-4 h-8 w-48" />
      <Skeleton className="mb-6 h-24 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

function OrderDetailContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const justPlaced = searchParams.get("placed") === "1";
  const { isAuthenticated } = useConvexAuth();

  const detail = useQuery(
    api.orders.getOrderDetail,
    isAuthenticated ? { orderId: id as Id<"orders"> } : "skip"
  );

  if (!isAuthenticated || detail === undefined) {
    return <OrderDetailSkeleton />;
  }

  if (detail === null) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold">Order not found</h1>
        <p className="mb-6 text-muted-foreground">
          This order doesn&apos;t exist or doesn&apos;t belong to your account.
        </p>
        <Button asChild>
          <Link href="/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  const { order, items, address } = detail;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
        <Link href="/orders">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to orders
        </Link>
      </Button>

      {/* Success banner — shown only when redirected from checkout */}
      {justPlaced && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-300">
              Your order has been placed!
            </p>
            <p className="mt-0.5 text-sm text-green-700 dark:text-green-400">
              We&apos;ve received your order and will confirm it shortly.
            </p>
          </div>
        </div>
      )}

      {/* Order header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-mono text-xl font-bold">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge
          variant={ORDER_STATUS_VARIANTS[order.status] ?? "outline"}
          className="text-sm"
        >
          {ORDER_STATUS_LABELS[order.status] ?? order.status}
        </Badge>
      </div>

      {/* Items */}
      <div className="mb-6 rounded-lg border">
        <div className="p-4 pb-0">
          <h2 className="font-semibold">Items</h2>
        </div>
        <div className="divide-y">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                {item.productImageSnapshot ? (
                  <Image
                    src={item.productImageSnapshot}
                    alt={item.productNameSnapshot}
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
                <p className="truncate font-medium">{item.productNameSnapshot}</p>
                <p className="text-sm text-muted-foreground">{item.unitSnapshot}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × ₹{(item.priceSnapshot / 100).toFixed(2)}
                </p>
                <p className="font-semibold">
                  ₹{(item.lineTotal / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2 border-t p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{(order.subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-green-600">
              {order.deliveryFee === 0 ? "Free" : `₹${(order.deliveryFee / 100).toFixed(2)}`}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{(order.total / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment info */}
      <div className="mb-6 rounded-lg border p-4">
        <h2 className="mb-3 font-semibold">Payment</h2>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Method</span>
          <span>{PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="capitalize">{order.paymentStatus}</span>
        </div>
      </div>

      {/* Delivery address */}
      {address && (
        <div className="rounded-lg border p-4">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">Delivery address</h2>
          </div>
          <div className="text-sm space-y-0.5 text-muted-foreground">
            <p className="font-medium text-foreground">{address.name}</p>
            <p>{address.phone}</p>
            <p>
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}
            </p>
            {address.landmark && <p>Near {address.landmark}</p>}
            <p>
              {address.city}, {address.state} — {address.pincode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailContent id={id} />
    </Suspense>
  );
}
