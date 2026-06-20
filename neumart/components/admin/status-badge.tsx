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

const ORDER_STATUS_MAP: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  placed: { label: "Placed", variant: "default" },
  confirmed: { label: "Confirmed", variant: "default" },
  preparing: { label: "Preparing", variant: "secondary" },
  out_for_delivery: { label: "Out for Delivery", variant: "secondary" },
  delivered: { label: "Delivered", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export function OrderStatusBadge({ status }: { status: string }) {
  const { label, variant } = ORDER_STATUS_MAP[status] ?? {
    label: status,
    variant: "outline" as const,
  };
  return <Badge variant={variant}>{label}</Badge>;
}

const PAYMENT_STATUS_MAP: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  pending: { label: "Pending", variant: "secondary" },
  paid: { label: "Paid", variant: "default" },
  failed: { label: "Failed", variant: "destructive" },
  refunded: { label: "Refunded", variant: "outline" },
};

export function PaymentStatusBadge({ status }: { status: string }) {
  const { label, variant } = PAYMENT_STATUS_MAP[status] ?? {
    label: status,
    variant: "outline" as const,
  };
  return <Badge variant={variant}>{label}</Badge>;
}
