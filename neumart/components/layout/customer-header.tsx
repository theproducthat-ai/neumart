"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Heart, MapPin, ShoppingCart, Search, ClipboardList } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartCount } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function CustomerHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const cartCount = useCartCount();
  const { isSignedIn } = useUser();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      {/* Main row */}
      <div className="container mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        {/* Logo */}
        <Link
          href="/products"
          className="shrink-0 text-lg font-bold tracking-tight text-foreground"
        >
          Nuemart
        </Link>

        {/* Search — hidden on mobile, shown from md */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 items-center gap-2 md:flex"
        >
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products…"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Nav icons */}
        <nav className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              "hidden sm:inline-flex",
              isActive("/products") && "bg-accent text-accent-foreground"
            )}
          >
            <Link href="/products">Shop</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className={isActive("/favourites") ? "text-rose-600" : ""}
          >
            <Link href="/favourites" aria-label="My favourites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {isSignedIn && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn(
                "hidden sm:inline-flex",
                isActive("/addresses") && "bg-accent text-accent-foreground"
              )}
            >
              <Link href="/addresses" aria-label="My addresses">
                <MapPin className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {isSignedIn && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={cn(
                "hidden sm:inline-flex",
                isActive("/orders") && "bg-accent text-accent-foreground"
              )}
            >
              <Link href="/orders" aria-label="My orders">
                <ClipboardList className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Cart with badge */}
          <div className="relative">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}>
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
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
          )}
        </nav>
      </div>

      {/* Mobile search row */}
      <div className="border-t px-4 pb-2 pt-2 md:hidden">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products…"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>
      </div>
    </header>
  );
}
