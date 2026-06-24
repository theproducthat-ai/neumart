"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Apple,
  Carrot,
  Cookie,
  GlassWater,
  Home,
  LayoutGrid,
  Milk,
  Package,
  Popcorn,
  Search,
  Wheat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BannerCarousel } from "@/components/banners/banner-carousel";
import { banners } from "@/lib/banners.config";

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  fruits: Apple,
  vegetables: Carrot,
  dairy: Milk,
  bakery: Cookie,
  beverages: GlassWater,
  snacks: Popcorn,
  staples: Wheat,
  household: Home,
};

function CategoryChips({
  categories,
  category,
  search,
  onSelect,
}: {
  categories: Array<{ _id: string; name: string; slug: string }> | undefined;
  category: string;
  search: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div
      className="mb-6 flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      <Button
        variant={!category && !search ? "default" : "outline"}
        size="sm"
        className="gap-1.5"
        onClick={() => onSelect("")}
      >
        <LayoutGrid className="h-4 w-4" />
        All
      </Button>
      {categories === undefined
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-md" />
          ))
        : categories.map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.slug] ?? Package;
            return (
              <Button
                key={cat._id}
                variant={category === cat.slug ? "default" : "outline"}
                size="sm"
                className="gap-1.5"
                onClick={() => onSelect(cat.slug)}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </Button>
            );
          })}
    </div>
  );
}

function ProductsContent() {
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

  const selectedCategoryName = categories?.find((c) => c.slug === category)?.name;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <CategoryChips
        categories={categories}
        category={category}
        search={search}
        onSelect={setCategory}
      />

      {/* Active filter context */}
      {(search || selectedCategoryName) && (
        <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
          {search ? (
            <>
              <Search className="h-4 w-4 shrink-0" />
              <span>
                Results for <span className="font-medium text-foreground">&ldquo;{search}&rdquo;</span>
                {products !== undefined && (
                  <span className="ml-1">— {products.length} found</span>
                )}
              </span>
            </>
          ) : (
            <span>
              Showing <span className="font-medium text-foreground">{selectedCategoryName}</span>
              {products !== undefined && (
                <span className="ml-1">— {products.length} product{products.length !== 1 ? "s" : ""}</span>
              )}
            </span>
          )}
          <button
            onClick={clearSearch}
            className="ml-1 text-xs underline hover:text-foreground"
          >
            Clear
          </button>
        </div>
      )}

      {/* Product grid */}
      {products === undefined ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-1 text-lg font-semibold">
            {search ? "No products found" : "No products available"}
          </h2>
          <p className="mb-6 max-w-sm text-sm text-muted-foreground">
            {search
              ? `We couldn't find anything for "${search}". Try a different search term.`
              : "Check back soon — products will appear here once added."}
          </p>
          {(search || category) && (
            <Button variant="outline" onClick={clearSearch}>
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

export default function ProductsPage() {
  const activeBanners = banners.filter((b) => b.isActive);

  return (
    <>
      {activeBanners.length > 0 && (
        <div className="container mx-auto max-w-7xl px-4 pt-6 pb-2">
          <BannerCarousel banners={activeBanners} />
        </div>
      )}
      <Suspense
        fallback={
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="mb-6 flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-md" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-lg" />
              ))}
            </div>
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
    </>
  );
}
