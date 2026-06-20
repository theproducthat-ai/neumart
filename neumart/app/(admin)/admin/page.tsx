import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to the Nuemart admin panel.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-5">
          <h2 className="font-semibold">Categories</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage product categories and their visibility.
          </p>
          <Button asChild className="mt-4" size="sm">
            <Link href="/admin/categories">Manage categories</Link>
          </Button>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="font-semibold">Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit and toggle visibility of products.
          </p>
          <Button asChild className="mt-4" size="sm">
            <Link href="/admin/products">Manage products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
