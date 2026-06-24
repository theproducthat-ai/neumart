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
import { ProductForm } from "@/components/admin/product-form";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useConvexAuth();
  const product = useQuery(
    api.products.adminGetById,
    isAuthenticated ? { productId: id as Id<"products"> } : "skip"
  );

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/admin/products">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to products
        </Link>
      </Button>

      {product === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-96 w-full max-w-lg rounded-lg" />
        </div>
      ) : product === null ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/products">Back to products</Link>
          </Button>
        </div>
      ) : (
        <>
          <PageHeader
            title={`Edit: ${product.name}`}
            description="Update product details."
          />
          <ProductForm
            mode="edit"
            productId={product._id}
            defaultValues={{
              name: product.name,
              slug: product.slug,
              description: product.description ?? "",
              categoryId: product.categoryId,
              price: product.price / 100,
              unit: product.unit,
              imageUrl: product.imageUrl ?? "",
              stockQuantity: product.stockQuantity,
              lowStockThreshold: product.lowStockThreshold ?? 5,
              isActive: product.isActive,
              isFeatured: product.isFeatured ?? false,
              ingredients: product.ingredients ?? "",
              containsAllergens: product.containsAllergens ?? [],
              mayContainAllergens: product.mayContainAllergens ?? [],
              dietaryTags: product.dietaryTags ?? [],
              allergenNotes: product.allergenNotes ?? "",
            }}
          />
        </>
      )}
    </div>
  );
}
