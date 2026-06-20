"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Plus, Pencil, Package } from "lucide-react";

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ActiveBadge, FeaturedBadge, StockBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";

export default function AdminProductsPage() {
  const { isAuthenticated } = useConvexAuth();
  const products = useQuery(api.products.adminListAll, isAuthenticated ? {} : "skip");
  const categories = useQuery(api.categories.adminListAll, isAuthenticated ? {} : "skip");
  const adminUpdate = useMutation(api.products.adminUpdate);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "active" | "inactive">("");

  const categoryMap = new Map(categories?.map((c) => [c._id, c.name]) ?? []);

  const filtered = products?.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && p.categoryId !== filterCategory) return false;
    if (filterStatus === "active" && !p.isActive) return false;
    if (filterStatus === "inactive" && p.isActive) return false;
    return true;
  });

  async function toggleActive(
    id: Id<"products">,
    current: { name: string; slug: string; categoryId: Id<"categories">; price: number; unit: string; stockQuantity: number; isActive: boolean; isFeatured?: boolean }
  ) {
    try {
      await adminUpdate({
        productId: id,
        name: current.name,
        slug: current.slug,
        categoryId: current.categoryId,
        price: current.price,
        unit: current.unit,
        stockQuantity: current.stockQuantity,
        isActive: !current.isActive,
        isFeatured: current.isFeatured,
      });
      toast.success(current.isActive ? "Product deactivated" : "Product activated");
    } catch {
      toast.error("Failed to update product");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage products available on the storefront."
        action={
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              New product
            </Link>
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">All categories</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "" | "active" | "inactive")}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {products === undefined ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="No products yet"
          description="Create your first product to start selling."
          ctaLabel="New product"
          ctaHref="/admin/products/new"
          icon={<Package className="h-10 w-10" />}
        />
      ) : filtered?.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No products match your filters.</p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <Package className="m-auto h-5 w-5 translate-y-2.5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium leading-tight">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.unit}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {categoryMap.get(product.categoryId) ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm">
                    ₹{(product.price / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <StockBadge qty={product.stockQuantity} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <ActiveBadge isActive={product.isActive} />
                      <FeaturedBadge isFeatured={product.isFeatured} />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {fmtDate(product.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${product._id}/edit`}>
                          <Pencil className="mr-1 h-3.5 w-3.5" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(product._id, product)}
                      >
                        {product.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
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
