"use client";

import { useState } from "react";
import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ShoppingBag, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, formatDate } from "@/lib/format";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  pay_later: "Pay Later",
  razorpay: "Razorpay",
};

type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export default function AdminOrdersPage() {
  const { isAuthenticated } = useConvexAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");

  const orders = useQuery(
    api.orders.adminGetOrders,
    isAuthenticated
      ? {
          status: statusFilter === "all" ? undefined : statusFilter,
          paymentStatus: paymentFilter === "all" ? undefined : paymentFilter,
          search: search.trim() || undefined,
        }
      : "skip"
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="View and manage all customer orders."
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1" style={{ minWidth: "200px", maxWidth: "320px" }}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search order number…"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="placed">Placed</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={paymentFilter}
          onValueChange={(v) => setPaymentFilter(v as PaymentStatus | "all")}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All payments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All payments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        {(statusFilter !== "all" || paymentFilter !== "all" || search) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setPaymentFilter("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Table */}
      {orders === undefined ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description={
            statusFilter !== "all" || paymentFilter !== "all" || search
              ? "Try adjusting your filters."
              : "Orders will appear here after customers start placing them."
          }
          icon={<ShoppingBag className="h-10 w-10" />}
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono text-sm font-semibold">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="max-w-45">
                    {order.customer ? (
                      <div className="min-w-0">
                        {order.customer.name && (
                          <p className="truncate text-sm font-medium">
                            {order.customer.name}
                          </p>
                        )}
                        <p className="truncate text-xs text-muted-foreground">
                          {order.customer.email}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {order.itemCount}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/orders/${order._id}`}>
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
