"use client";

import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ShoppingBag, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/format";

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
  pending: "Pay Later",
  paid: "Paid",
  failed: "Payment Failed",
  refunded: "Refunded",
};

const PAYMENT_STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "secondary",
  paid: "default",
  failed: "destructive",
  refunded: "outline",
};

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
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">No orders yet</h1>
        <p className="mb-6 text-muted-foreground">
          Your order history will appear here after your first purchase.
        </p>
        <Button asChild size="lg">
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
            className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40"
          >
            {/* Status indicator dot */}
            <div className="hidden shrink-0 sm:block">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  order.status === "delivered"
                    ? "bg-green-500"
                    : order.status === "cancelled"
                    ? "bg-destructive"
                    : "bg-primary"
                }`}
              />
            </div>

            <div className="min-w-0 flex-1 space-y-1.5">
              {/* Order number + status */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold">
                  {order.orderNumber}
                </span>
                <Badge variant={ORDER_STATUS_VARIANTS[order.status] ?? "outline"}>
                  {ORDER_STATUS_LABELS[order.status] ?? order.status}
                </Badge>
                <Badge
                  variant={PAYMENT_STATUS_VARIANTS[order.paymentStatus] ?? "outline"}
                >
                  {PAYMENT_STATUS_LABELS[order.paymentStatus] ?? order.paymentStatus}
                </Badge>
              </div>

              {/* Date + item count */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatDate(order.createdAt)}</span>
                <span>·</span>
                <span>
                  {order.itemCount} item{order.itemCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Total + chevron */}
            <div className="flex shrink-0 items-center gap-2">
              <p className="font-bold">{formatCurrency(order.total)}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
