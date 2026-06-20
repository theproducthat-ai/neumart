"use client";

import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  XCircle,
  ShoppingBag,
  Package,
  Tag,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";

function StatCard({
  label,
  value,
  href,
  icon: Icon,
  highlight,
}: {
  label: string;
  value?: number;
  href?: string;
  icon?: React.ElementType;
  highlight?: "warning" | "danger";
}) {
  const content = (
    <div
      className={`rounded-lg border p-5 transition-colors ${
        href ? "hover:bg-muted/40" : ""
      } ${
        highlight === "warning"
          ? "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20"
          : highlight === "danger"
          ? "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
          : ""
      }`}
    >
      {Icon && (
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <Icon
            className={`h-3.5 w-3.5 ${
              highlight === "warning"
                ? "text-amber-500"
                : highlight === "danger"
                ? "text-red-500"
                : ""
            }`}
          />
          {label}
        </div>
      )}
      {!Icon && (
        <p className="text-sm text-muted-foreground">{label}</p>
      )}
      {value === undefined ? (
        <Skeleton className="mt-1 h-8 w-16" />
      ) : (
        <p
          className={`mt-1 text-3xl font-bold ${
            highlight === "warning"
              ? "text-amber-700 dark:text-amber-400"
              : highlight === "danger"
              ? "text-red-700 dark:text-red-400"
              : ""
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

function ManageCard({
  title,
  description,
  href,
  icon: Icon,
  ctaLabel,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  ctaLabel: string;
}) {
  return (
    <div className="rounded-lg border p-5">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Button asChild size="sm">
        <Link href={href}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { isAuthenticated } = useConvexAuth();
  const stats = useQuery(
    api.orders.adminGetOrderStats,
    isAuthenticated ? {} : "skip"
  );
  const inventoryStats = useQuery(
    api.inventory.adminGetInventoryStats,
    isAuthenticated ? {} : "skip"
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of orders and inventory for Nuemart.
        </p>
      </div>

      <Separator />

      {/* Order stats */}
      <div>
        <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" />
          Orders
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total orders" value={stats?.total} href="/admin/orders" />
          <StatCard
            label="New (placed)"
            value={stats?.placed}
            href="/admin/orders"
            icon={Clock}
          />
          <StatCard label="Pending payment" value={stats?.pendingPayment} />
          <StatCard label="Delivered" value={stats?.delivered} />
        </div>
      </div>

      {/* Inventory stats */}
      <div>
        <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Package className="h-3.5 w-3.5" />
          Inventory
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Active products"
            value={inventoryStats?.totalActiveProducts}
            href="/admin/products"
          />
          <StatCard label="Total stock units" value={inventoryStats?.totalStock} />
          <StatCard
            label="Low stock"
            value={inventoryStats?.lowStockCount}
            href="/admin/inventory?stock=low_stock"
            icon={AlertTriangle}
            highlight={
              inventoryStats?.lowStockCount
                ? inventoryStats.lowStockCount > 0
                  ? "warning"
                  : undefined
                : undefined
            }
          />
          <StatCard
            label="Out of stock"
            value={inventoryStats?.outOfStockCount}
            href="/admin/inventory?stock=out_of_stock"
            icon={XCircle}
            highlight={
              inventoryStats?.outOfStockCount
                ? inventoryStats.outOfStockCount > 0
                  ? "danger"
                  : undefined
                : undefined
            }
          />
        </div>
      </div>

      {/* Quick management */}
      <div>
        <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Manage
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ManageCard
            title="Orders"
            description="View, search and update fulfilment status."
            href="/admin/orders"
            icon={ShoppingBag}
            ctaLabel="Manage orders"
          />
          <ManageCard
            title="Inventory"
            description="Monitor stock levels and make manual adjustments."
            href="/admin/inventory"
            icon={BarChart3}
            ctaLabel="Manage inventory"
          />
          <ManageCard
            title="Products"
            description="Add, edit and toggle visibility of products."
            href="/admin/products"
            icon={Package}
            ctaLabel="Manage products"
          />
          <ManageCard
            title="Categories"
            description="Manage product categories and their visibility."
            href="/admin/categories"
            icon={Tag}
            ctaLabel="Manage categories"
          />
        </div>
      </div>
    </div>
  );
}
