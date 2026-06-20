"use client";

import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, XCircle } from "lucide-react";

function StatCard({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-lg border p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      {value === undefined ? (
        <Skeleton className="mt-1 h-8 w-16" />
      ) : (
        <p className="mt-1 text-3xl font-bold">{value}</p>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { isAuthenticated } = useConvexAuth();
  const stats = useQuery(
    api.orders.adminGetOrderStats,
    isAuthenticated ? {} : "skip",
  );
  const inventoryStats = useQuery(
    api.inventory.adminGetInventoryStats,
    isAuthenticated ? {} : "skip",
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to the Nuemart admin panel.
        </p>
      </div>

      {/* Order stats */}
      <div>
        <h2 className="mb-3 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Orders overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total orders" value={stats?.total} />
          <StatCard label="Placed (new)" value={stats?.placed} />
          <StatCard label="Pending payment" value={stats?.pendingPayment} />
          <StatCard label="Delivered" value={stats?.delivered} />
        </div>
      </div>

      {/* Inventory stats */}
      <div>
        <h2 className="mb-3 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Inventory overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active products" value={inventoryStats?.totalActiveProducts} />
          <StatCard label="Total stock units" value={inventoryStats?.totalStock} />
          <div className="rounded-lg border p-5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Low stock
            </div>
            {inventoryStats === undefined ? (
              <Skeleton className="mt-1 h-8 w-16" />
            ) : (
              <p className="mt-1 text-3xl font-bold">{inventoryStats.lowStockCount}</p>
            )}
          </div>
          <div className="rounded-lg border p-5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <XCircle className="h-4 w-4 text-red-500" />
              Out of stock
            </div>
            {inventoryStats === undefined ? (
              <Skeleton className="mt-1 h-8 w-16" />
            ) : (
              <p className="mt-1 text-3xl font-bold">{inventoryStats.outOfStockCount}</p>
            )}
          </div>
        </div>
      </div>

      {/* Management cards */}
      <div>
        <h2 className="mb-3 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Manage
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Orders</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              View, search and update fulfilment status.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/orders">Manage orders</Link>
            </Button>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Inventory</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor stock levels and make manual adjustments.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/inventory">Manage inventory</Link>
            </Button>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Categories</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage product categories and their visibility.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/categories">Manage categories</Link>
            </Button>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Products</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add, edit and toggle visibility of products.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/products">Manage products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
