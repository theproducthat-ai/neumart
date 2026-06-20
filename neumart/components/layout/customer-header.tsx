"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, MapPin, ShoppingCart, Search } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartCount } from "@/store/cart-store";

export function CustomerHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const cartCount = useCartCount();
  const { isSignedIn } = useUser();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/products" className="shrink-0 text-xl font-bold tracking-tight">
          Nuemart
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products…"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">Shop</Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/favourites" aria-label="Favourites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {isSignedIn && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/addresses" aria-label="My addresses">
                <MapPin className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Cart with badge */}
          <div className="relative">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            {cartCount > 0 && (
              <Badge className="pointer-events-none absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs">
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            )}
          </div>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">Sign in</Button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  );
}
