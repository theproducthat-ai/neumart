"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/admin/page-header";
import { CategoryForm } from "@/components/admin/category-form";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useConvexAuth();
  const category = useQuery(
    api.categories.adminGetById,
    isAuthenticated ? { categoryId: id as Id<"categories"> } : "skip"
  );

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/admin/categories">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to categories
        </Link>
      </Button>

      {category === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-96 w-full max-w-lg rounded-lg" />
        </div>
      ) : category === null ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">Category not found.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/categories">Back to categories</Link>
          </Button>
        </div>
      ) : (
        <>
          <PageHeader
            title={`Edit: ${category.name}`}
            description="Update category details."
          />
          <CategoryForm
            mode="edit"
            categoryId={category._id}
            defaultValues={{
              name: category.name,
              slug: category.slug,
              description: category.description ?? "",
              sortOrder: category.sortOrder,
              isActive: category.isActive,
            }}
          />
        </>
      )}
    </div>
  );
}
