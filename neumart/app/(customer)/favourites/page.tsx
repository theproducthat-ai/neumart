"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavouritesPage() {
  const favourites = useQuery(api.favourites.getUserFavourites);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Favourites</h1>

      {favourites === undefined ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      ) : favourites.length === 0 ? (
        <div className="py-16 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="mb-4 text-muted-foreground">No favourites saved yet.</p>
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favourites.map(({ product }) =>
            product ? <ProductCard key={product._id} product={product} /> : null
          )}
        </div>
      )}
    </div>
  );
}
