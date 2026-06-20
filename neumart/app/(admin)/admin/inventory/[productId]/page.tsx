"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

function StockStatusBadge({ status }: { status: "in_stock" | "low_stock" | "out_of_stock" }) {
  if (status === "out_of_stock")
    return <Badge variant="destructive">Out of stock</Badge>;
  if (status === "low_stock")
    return <Badge variant="secondary">Low stock</Badge>;
  return <Badge variant="default">In stock</Badge>;
}

function computeStockStatus(
  stockQuantity: number,
  lowStockThreshold: number | undefined,
): "in_stock" | "low_stock" | "out_of_stock" {
  const threshold = lowStockThreshold ?? 5;
  if (stockQuantity === 0) return "out_of_stock";
  if (stockQuantity <= threshold) return "low_stock";
  return "in_stock";
}

function MovementTypeBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    order_placed: { label: "Order placed", variant: "secondary" },
    restock: { label: "Restock", variant: "default" },
    manual_adjustment: { label: "Manual deduct", variant: "destructive" },
    stock_correction: { label: "Correction", variant: "outline" },
  };
  const { label, variant } = map[type] ?? { label: type, variant: "outline" as const };
  return <Badge variant={variant}>{label}</Badge>;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProductInventoryPage() {
  const { productId } = useParams<{ productId: string }>();
  const { isAuthenticated } = useConvexAuth();
  const [adjustOpen, setAdjustOpen] = useState(false);

  const product = useQuery(
    api.products.adminGetById,
    isAuthenticated ? { productId: productId as Id<"products"> } : "skip",
  );

  const movements = useQuery(
    api.inventory.adminGetStockMovements,
    isAuthenticated
      ? { productId: productId as Id<"products">, limit: 50 }
      : "skip",
  );

  if (product === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/inventory">Back to inventory</Link>
        </Button>
      </div>
    );
  }

  const stockStatus = computeStockStatus(
    product.stockQuantity,
    product.lowStockThreshold,
  );

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-4">
          <Link href="/admin/inventory">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to inventory
          </Link>
        </Button>
        <PageHeader
          title={product.name}
          description="Stock detail and movement history."
          action={
            <Button onClick={() => setAdjustOpen(true)}>Adjust stock</Button>
          }
        />
      </div>

      {/* Product info cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Current stock</p>
          <p className="mt-1 text-3xl font-bold">{product.stockQuantity}</p>
        </div>
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Low stock threshold</p>
          <p className="mt-1 text-3xl font-bold">
            {product.lowStockThreshold ?? 5}
          </p>
        </div>
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Stock status</p>
          <div className="mt-2">
            <StockStatusBadge status={stockStatus} />
          </div>
        </div>
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Visibility</p>
          <div className="mt-2">
            <ActiveBadge isActive={product.isActive} />
          </div>
        </div>
      </div>

      {/* Stock movements */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Stock movement history</h2>

        {movements === undefined ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : movements.length === 0 ? (
          <EmptyState
            title="No movements yet"
            description="Stock movements will appear here when stock is adjusted or orders are placed."
            icon={<Package className="h-10 w-10" />}
          />
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Before</TableHead>
                  <TableHead className="text-right">After</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((m) => (
                  <TableRow key={m._id}>
                    <TableCell>
                      <MovementTypeBadge type={m.type} />
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono font-semibold ${
                        m.quantityChange > 0
                          ? "text-green-600"
                          : m.quantityChange < 0
                            ? "text-red-600"
                            : ""
                      }`}
                    >
                      {m.quantityChange > 0 ? "+" : ""}
                      {m.quantityChange}
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {m.previousStock}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {m.newStock}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                      {m.reason}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(m.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Adjust stock dialog */}
      <AdjustStockDialog
        open={adjustOpen}
        onOpenChange={setAdjustOpen}
        productId={product._id}
        productName={product.name}
        currentStock={product.stockQuantity}
      />
    </div>
  );
}
