"use client";

import { useState } from "react";
import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Package, AlertTriangle, XCircle, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { ActiveBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { AdjustStockDialog } from "@/components/admin/adjust-stock-dialog";

type StockStatusFilter = "all" | "in_stock" | "low_stock" | "out_of_stock";

function StockStatusBadge({ status }: { status: "in_stock" | "low_stock" | "out_of_stock" }) {
  if (status === "out_of_stock")
    return <Badge variant="destructive">Out of stock</Badge>;
  if (status === "low_stock")
    return <Badge variant="secondary">Low stock</Badge>;
  return <Badge variant="default">In stock</Badge>;
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      {value === undefined ? (
        <Skeleton className="mt-1 h-8 w-16" />
      ) : (
        <p className="mt-1 text-3xl font-bold">{value}</p>
      )}
    </div>
  );
}

export default function InventoryPage() {
  const { isAuthenticated } = useConvexAuth();

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [stockStatus, setStockStatus] = useState<StockStatusFilter>("all");

  const [adjustTarget, setAdjustTarget] = useState<{
    productId: Id<"products">;
    productName: string;
    currentStock: number;
  } | null>(null);

  const stats = useQuery(
    api.inventory.adminGetInventoryStats,
    isAuthenticated ? {} : "skip",
  );

  const categories = useQuery(
    api.categories.adminListAll,
    isAuthenticated ? {} : "skip",
  );

  const products = useQuery(
    api.inventory.adminGetInventoryProducts,
    isAuthenticated
      ? {
          search: search.trim() || undefined,
          categoryId:
            categoryId !== "all" ? (categoryId as Id<"categories">) : undefined,
          stockStatus:
            stockStatus !== "all"
              ? (stockStatus as "in_stock" | "low_stock" | "out_of_stock")
              : undefined,
        }
      : "skip",
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Inventory"
        description="Monitor stock levels and make adjustments."
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active products"
          value={stats?.totalActiveProducts}
          icon={Package}
        />
        <StatCard
          label="Total stock units"
          value={stats?.totalStock}
          icon={BarChart3}
        />
        <StatCard
          label="Low stock"
          value={stats?.lowStockCount}
          icon={AlertTriangle}
        />
        <StatCard
          label="Out of stock"
          value={stats?.outOfStockCount}
          icon={XCircle}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-60"
        />

        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stockStatus} onValueChange={(v) => setStockStatus(v as StockStatusFilter)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Stock status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stock</SelectItem>
            <SelectItem value="in_stock">In stock</SelectItem>
            <SelectItem value="low_stock">Low stock</SelectItem>
            <SelectItem value="out_of_stock">Out of stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {products === undefined ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your filters."
          icon={<Package className="h-10 w-10" />}
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.categoryName ?? "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {product.stockQuantity}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {product.lowStockThreshold ?? 5}
                  </TableCell>
                  <TableCell>
                    <StockStatusBadge status={product.stockStatus} />
                  </TableCell>
                  <TableCell>
                    <ActiveBadge isActive={product.isActive} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setAdjustTarget({
                            productId: product._id,
                            productName: product.name,
                            currentStock: product.stockQuantity,
                          })
                        }
                      >
                        Adjust
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/admin/inventory/${product._id}`}>
                          History
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Adjust Stock Dialog */}
      {adjustTarget && (
        <AdjustStockDialog
          open={!!adjustTarget}
          onOpenChange={(open) => {
            if (!open) setAdjustTarget(null);
          }}
          productId={adjustTarget.productId}
          productName={adjustTarget.productName}
          currentStock={adjustTarget.currentStock}
        />
      )}
    </div>
  );
}
