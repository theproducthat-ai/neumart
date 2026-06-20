import { Badge } from "@/components/ui/badge";

export function ActiveBadge({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <Badge variant="default">Active</Badge>
  ) : (
    <Badge variant="secondary">Inactive</Badge>
  );
}

export function FeaturedBadge({ isFeatured }: { isFeatured?: boolean }) {
  if (!isFeatured) return null;
  return <Badge variant="outline">Featured</Badge>;
}

export function StockBadge({ qty }: { qty: number }) {
  if (qty === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (qty <= 5) return <Badge variant="secondary">Low stock</Badge>;
  return <Badge variant="default">{qty} in stock</Badge>;
}
