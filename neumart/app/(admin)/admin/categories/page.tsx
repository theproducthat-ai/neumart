"use client";

import Link from "next/link";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Plus, Pencil, Tag } from "lucide-react";
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
import { formatDate } from "@/lib/format";

export default function AdminCategoriesPage() {
  const { isAuthenticated } = useConvexAuth();
  const categories = useQuery(api.categories.adminListAll, isAuthenticated ? {} : "skip");
  const adminUpdate = useMutation(api.categories.adminUpdate);

  async function toggleActive(
    id: Id<"categories">,
    current: { name: string; slug: string; isActive: boolean }
  ) {
    try {
      await adminUpdate({
        categoryId: id,
        name: current.name,
        slug: current.slug,
        isActive: !current.isActive,
      });
      toast.success(current.isActive ? "Category deactivated" : "Category activated");
    } catch {
      toast.error("Failed to update category");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage product categories shown on the storefront."
        action={
          <Button asChild>
            <Link href="/admin/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              New category
            </Link>
          </Button>
        }
      />

      {categories === undefined ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create your first category to start organising products."
          ctaLabel="New category"
          ctaHref="/admin/categories/new"
          icon={<Tag className="h-10 w-10" />}
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Sort</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat._id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {cat.slug}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {cat.description ?? "—"}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {cat.sortOrder ?? "—"}
                  </TableCell>
                  <TableCell>
                    <ActiveBadge isActive={cat.isActive} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(cat.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/categories/${cat._id}/edit`}>
                          <Pencil className="mr-1 h-3.5 w-3.5" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(cat._id, cat)}
                      >
                        {cat.isActive ? "Deactivate" : "Activate"}
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
