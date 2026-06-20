"use client";

import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "Payment Pending",
  paid: "Paid",
  failed: "Payment Failed",
  refunded: "Refunded",
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OrdersPage() {
  const { isAuthenticated } = useConvexAuth();
  const orders = useQuery(
    api.orders.getUserOrders,
    isAuthenticated ? {} : "skip"
  );

  if (!isAuthenticated || orders === undefined) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold">No orders yet</h1>
        <p className="text-muted-foreground">
          Your order history will appear here after your first purchase.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Start shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/orders/${order._id}`}
            className="flex items-center justify-between rounded-lg border p-5 transition-colors hover:bg-muted/40"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold">
                  {order.orderNumber}
                </span>
                <Badge variant={ORDER_STATUS_VARIANTS[order.status] ?? "outline"}>
                  {ORDER_STATUS_LABELS[order.status] ?? order.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(order.createdAt)} ·{" "}
                {order.itemCount} item{order.itemCount !== 1 ? "s" : ""}
              </p>
              <p className="text-sm text-muted-foreground">
                {PAYMENT_STATUS_LABELS[order.paymentStatus] ?? order.paymentStatus}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <p className="font-bold">₹{(order.total / 100).toFixed(2)}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
