import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/admin/products">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to products
        </Link>
      </Button>
      <PageHeader
        title="New product"
        description="Add a new product to the catalogue."
      />
      <ProductForm mode="create" />
    </div>
  );
}
