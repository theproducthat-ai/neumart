import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/admin/categories">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to categories
        </Link>
      </Button>
      <PageHeader
        title="New category"
        description="Create a new product category."
      />
      <CategoryForm mode="create" />
    </div>
  );
}
