import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
      <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
      <h1 className="mb-2 text-2xl font-bold">My Orders</h1>
      <p className="text-muted-foreground">
        Your order history will appear here after your first purchase.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Checkout via Razorpay is coming in a future phase.
      </p>
      <Button asChild className="mt-6">
        <Link href="/products">Continue shopping</Link>
      </Button>
    </div>
  );
}
