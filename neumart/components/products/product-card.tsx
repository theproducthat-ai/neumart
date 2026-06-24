"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Package } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Doc } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

interface ProductCardProps {
  product: Doc<"products">;
}

function StockBadge({ qty }: { qty: number }) {
  if (qty === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (qty <= 5)
    return (
      <Badge variant="secondary" className="text-amber-700 dark:text-amber-400">
        Only {qty} left
      </Badge>
    );
  return null;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isSignedIn } = useUser();
  const addItem = useCartStore((s) => s.addItem);
  const toggleFavourite = useMutation(api.favourites.toggleFavourite);
  const isFavourite = useQuery(
    api.favourites.checkIfProductIsFavourite,
    isSignedIn ? { productId: product._id } : "skip"
  );

  const canAddToCart = product.isActive && product.stockQuantity > 0;

  function handleAddToCart() {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart`);
  }

  async function handleToggleFavourite() {
    if (!isSignedIn) {
      toast("Sign in to save favourites");
      return;
    }
    try {
      const result = await toggleFavourite({ productId: product._id });
      toast.success(
        result.favourited ? "Added to favourites" : "Removed from favourites"
      );
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-muted/60 to-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-background/60 p-3">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          )}
          {/* Out of stock overlay */}
          {product.stockQuantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <span className="rounded-md bg-background px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                Out of stock
              </span>
            </div>
          )}
          {/* Favourite overlay */}
          <button
            onClick={(e) => { e.preventDefault(); handleToggleFavourite(); }}
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            className={`absolute right-2 top-2 z-10 rounded-full p-1.5 shadow-sm transition-colors ${
              isFavourite
                ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400"
                : "bg-white/80 text-muted-foreground hover:bg-white hover:text-rose-500 dark:bg-background/70 dark:hover:bg-background"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavourite ? "fill-current" : ""}`} />
          </button>
        </div>
      </Link>

      {/* Details */}
      <CardContent className="flex flex-1 flex-col gap-1 p-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <div className="flex items-center justify-between gap-1">
          <p className="text-base font-bold tracking-tight">
            {formatCurrency(product.price)}
          </p>
          <StockBadge qty={product.stockQuantity} />
        </div>
        {(product.containsAllergens?.length ?? 0) > 0 ? (
          <Badge variant="outline" className="w-fit border-amber-300 text-xs font-normal text-amber-700 dark:border-amber-700 dark:text-amber-400">
            Contains allergens
          </Badge>
        ) : (product.mayContainAllergens?.length ?? 0) > 0 ? (
          <Badge variant="outline" className="w-fit text-xs font-normal text-muted-foreground">
            May contain allergens
          </Badge>
        ) : null}
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-3 pt-0">
        <Button
          size="sm"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          aria-label={canAddToCart ? `Add ${product.name} to cart` : `${product.name} unavailable`}
        >
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
          {canAddToCart ? "Add to cart" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}
