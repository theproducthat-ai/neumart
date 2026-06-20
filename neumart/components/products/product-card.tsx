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

interface ProductCardProps {
  product: Doc<"products">;
}

function stockBadge(qty: number) {
  if (qty === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (qty <= 5) return <Badge variant="secondary">Low stock</Badge>;
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
      toast.success(result.favourited ? "Added to favourites" : "Removed from favourites");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square bg-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <CardContent className="flex-1 p-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.unit}</p>
        <p className="mt-2 font-bold">₹{(product.price / 100).toFixed(2)}</p>
        <div className="mt-1">{stockBadge(product.stockQuantity)}</div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="gap-2 p-3 pt-0">
        <Button
          size="sm"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
        >
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
          {canAddToCart ? "Add to cart" : "Unavailable"}
        </Button>
        <Button
          size="icon"
          variant={isFavourite ? "default" : "outline"}
          className="shrink-0"
          onClick={handleToggleFavourite}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart className={`h-4 w-4 ${isFavourite ? "fill-current" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  );
}
