"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, Package, MapPin, User, CreditCard } from "lucide-react";
import { AdminDeliverySection } from "@/components/delivery/AdminDeliverySection";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, formatDateTime } from "@/lib/format";

const ORDER_STATUSES = [
  { value: "placed", label: "Placed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
] as const;

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  pay_later: "Pay Later",
};

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isAuthenticated } = useConvexAuth();

  const detail = useQuery(
    api.orders.adminGetOrderDetail,
    isAuthenticated ? { orderId: id as Id<"orders"> } : "skip"
  );
  const updateStatus = useMutation(api.orders.adminUpdateOrderStatus);

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Sync selectedStatus when order data loads
  useEffect(() => {
    if (detail?.order) {
      setSelectedStatus(detail.order.status);
    }
  }, [detail?.order?.status]);

  if (!isAuthenticated || detail === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-64 lg:col-span-2 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (detail === null) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/orders">Back to orders</Link>
        </Button>
      </div>
    );
  }

  const { order, items, address, user } = detail;

  async function handleUpdateStatus() {
    if (!selectedStatus || selectedStatus === order.status) return;
    setSaving(true);
    try {
      await updateStatus({
        orderId: order._id,
        status: selectedStatus as (typeof ORDER_STATUSES)[number]["value"],
      });
      toast.success("Order status updated");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update status";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  const statusChanged = selectedStatus !== order.status;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-3">
          <Link href="/admin/orders">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to orders
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-mono text-2xl font-bold">{order.orderNumber}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed on {formatDateTime(order.createdAt)}
              {order.updatedAt !== order.createdAt && (
                <> · Updated {formatDateTime(order.updatedAt)}</>
              )}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: items + totals */}
        <div className="space-y-6 lg:col-span-2">
          {/* Items table */}
          <div className="rounded-lg border">
            <div className="p-4 pb-0">
              <h2 className="font-semibold">
                Items ({order.itemCount})
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Line Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                          {item.productImageSnapshot ? (
                            <Image
                              src={item.productImageSnapshot}
                              alt={item.productNameSnapshot}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.productNameSnapshot}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.unitSnapshot}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.priceSnapshot)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.lineTotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Totals */}
            <div className="space-y-2 border-t p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discountAmount !== undefined && order.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-700 dark:text-green-400">
                  <span>
                    Coupon{order.couponCodeSnapshot ? ` (${order.couponCodeSnapshot})` : ""}
                  </span>
                  <span className="font-medium">−{formatCurrency(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-green-600">
                  {order.deliveryFee === 0 ? "Free" : formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: customer, address, payment, status update */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Customer</h2>
            </div>
            <Separator />
            {user ? (
              <div className="text-sm space-y-1">
                {user.name && <p className="font-medium">{user.name}</p>}
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Customer not found</p>
            )}
          </div>

          {/* Delivery address */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Delivery address</h2>
            </div>
            <Separator />
            {address ? (
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
            ) : (
              <p className="text-sm text-muted-foreground">Address not found</p>
            )}
          </div>

          {/* Payment */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Payment</h2>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Method</span>
                <span>
                  {PAYMENT_METHOD_LABELS[order.paymentMethod] ??
                    order.paymentMethod}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <PaymentStatusBadge status={order.paymentStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Status update */}
          <div className="rounded-lg border p-4 space-y-3">
            <h2 className="font-semibold">Update status</h2>
            <Separator />
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Current:{" "}
                <OrderStatusBadge status={order.status} />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="w-full"
                onClick={handleUpdateStatus}
                disabled={!statusChanged || saving}
              >
                {saving ? "Saving…" : "Update status"}
              </Button>
            </div>
          </div>

          <AdminDeliverySection orderId={order._id} />
        </div>
      </div>
    </div>
  );
}
