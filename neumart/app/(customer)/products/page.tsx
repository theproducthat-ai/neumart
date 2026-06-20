"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") ?? "";
  const search = searchParams.get("search") ?? "";

  const categories = useQuery(api.categories.getActiveCategories);

  const allProducts = useQuery(
    api.products.getActiveProducts,
    !category && !search ? {} : "skip"
  );
  const categoryProducts = useQuery(
    api.products.getProductsByCategory,
    category && !search ? { categorySlug: category } : "skip"
  );
  const searchProducts = useQuery(
    api.products.searchProducts,
    search ? { query: search } : "skip"
  );

  const products = search ? searchProducts : category ? categoryProducts : allProducts;

  function setCategory(slug: string) {
    router.push(slug ? `/products?category=${encodeURIComponent(slug)}` : "/products");
  }

  function clearSearch() {
    router.push("/products");
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Category chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={!category && !search ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("")}
        >
          All
        </Button>
        {categories === undefined
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-md" />
            ))
          : categories.map((cat) => (
              <Button
                key={cat._id}
                variant={category === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.slug)}
              >
                {cat.name}
              </Button>
            ))}
      </div>

      {/* Search context */}
      {search && (
        <p className="mb-4 text-sm text-muted-foreground">
          Results for &ldquo;{search}&rdquo; &mdash;{" "}
          <button onClick={clearSearch} className="underline hover:text-foreground">
            clear
          </button>
        </p>
      )}

      {/* Product grid */}
      {products === undefined ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            {search ? `No products found for "${search}".` : "No products available."}
          </p>
          {search && (
            <Button variant="outline" className="mt-4" onClick={clearSearch}>
              Browse all products
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
