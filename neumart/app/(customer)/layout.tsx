import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Neumart
          </Link>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link href="/products">Shop</Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/favourites">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/orders">Orders</Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <UserButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
