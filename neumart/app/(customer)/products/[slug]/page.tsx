"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";

function StockBadge({ qty, isActive }: { qty: number; isActive: boolean }) {
  if (!isActive) return <Badge variant="secondary">Unavailable</Badge>;
  if (qty === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (qty <= 5) return <Badge variant="secondary">Low stock — only {qty} left</Badge>;
  return <Badge variant="default">In stock</Badge>;
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isSignedIn } = useUser();
  const [quantity, setQuantity] = useState(1);

  const product = useQuery(api.products.getBySlug, { slug });
  const addItem = useCartStore((s) => s.addItem);
  const toggleFavourite = useMutation(api.favourites.toggleFavourite);
  const isFavourite = useQuery(
    api.favourites.checkIfProductIsFavourite,
    isSignedIn && product ? { productId: product._id } : "skip"
  );

  const canAddToCart = product?.isActive && product.stockQuantity > 0;

  // Loading
  if (product === undefined) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="mb-8 h-8 w-32" />
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (product === null) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  function handleAddToCart() {
    addItem({
      productId: product!._id,
      name: product!.name,
      price: product!.price,
      unit: product!.unit,
      imageUrl: product!.imageUrl,
      quantity,
    });
    toast.success(
      quantity > 1
        ? `${quantity} × ${product!.name} added to cart`
        : `${product!.name} added to cart`
    );
  }

  async function handleToggleFavourite() {
    if (!isSignedIn) {
      toast("Sign in to save favourites");
      return;
    }
    try {
      const result = await toggleFavourite({ productId: product!._id });
      toast.success(result.favourited ? "Added to favourites" : "Removed from favourites");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to products
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-24 w-24 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-1 text-muted-foreground">{product.unit}</p>
          </div>

          {product.description && (
            <p className="text-sm text-muted-foreground">{product.description}</p>
          )}

          <p className="text-3xl font-bold">₹{(product.price / 100).toFixed(2)}</p>

          <StockBadge qty={product.stockQuantity} isActive={product.isActive} />

          {canAddToCart && (
            <>
              <Separator />

              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      setQuantity(Math.min(product.stockQuantity, quantity + 1))
                    }
                    disabled={quantity >= product.stockQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>

              {quantity > 1 && (
                <p className="text-sm text-muted-foreground">
                  Subtotal:{" "}
                  <span className="font-semibold text-foreground">
                    ₹{((product.price * quantity) / 100).toFixed(2)}
                  </span>
                </p>
              )}

              {/* CTA */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
                <Button
                  size="lg"
                  variant={isFavourite ? "default" : "outline"}
                  onClick={handleToggleFavourite}
                  aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                >
                  <Heart className={`h-5 w-5 ${isFavourite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </>
          )}

          {/* Favourite only (when out of stock) */}
          {!canAddToCart && (
            <Button
              variant={isFavourite ? "default" : "outline"}
              onClick={handleToggleFavourite}
              className="w-fit"
            >
              <Heart className={`mr-2 h-4 w-4 ${isFavourite ? "fill-current" : ""}`} />
              {isFavourite ? "Saved to favourites" : "Save to favourites"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
