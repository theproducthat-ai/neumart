"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Truck } from "lucide-react";

type DeliveryStatus =
  | "pending"
  | "assigned"
  | "picked_up"
  | "out_for_delivery"
  | "delivered"
  | "failed"
  | "cancelled";

const STATUS_LABELS: Record<DeliveryStatus, string> = {
  pending: "Pending",
  assigned: "Delivery Assigned",
  picked_up: "Picked Up",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  failed: "Delivery Failed",
  cancelled: "Delivery Cancelled",
};

const STATUS_VARIANTS: Record<
  DeliveryStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  pending: "secondary",
  assigned: "secondary",
  picked_up: "secondary",
  out_for_delivery: "secondary",
  delivered: "outline",
  failed: "destructive",
  cancelled: "destructive",
};

export function DeliveryStatusSection({ orderId }: { orderId: Id<"orders"> }) {
  const result = useQuery(api.delivery.getCustomerDeliveryStatus, { orderId });

  // Loading
  if (result === undefined) {
    return <Skeleton className="h-24 w-full rounded-lg" />;
  }

  // No task (or not owner) — render nothing
  if (result === null) {
    return null;
  }

  const { status, address } = result;
  const deliveryStatus = status as DeliveryStatus;

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-semibold">Delivery</h2>
      </div>
      <Separator />

      <Badge variant={STATUS_VARIANTS[deliveryStatus] ?? "secondary"}>
        {STATUS_LABELS[deliveryStatus] ?? deliveryStatus}
      </Badge>

      {address && (
        <address className="not-italic space-y-0.5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{address.name}</p>
          <p>{address.phone}</p>
          <p>
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
          </p>
          {address.landmark && <p>Near {address.landmark}</p>}
          <p>
            {address.city}, {address.state} — {address.pincode}
          </p>
        </address>
      )}
    </div>
  );
}
