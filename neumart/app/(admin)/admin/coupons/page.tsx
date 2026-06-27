"use client";

import Link from "next/link";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { formatCurrency, formatDate } from "@/lib/format";

export default function AdminCouponsPage() {
  const { isAuthenticated } = useConvexAuth();
  const coupons = useQuery(api.coupons.listCoupons, isAuthenticated ? {} : "skip");
  const toggle = useMutation(api.coupons.toggleCouponActive);

  async function handleToggle(id: Id<"coupons">, currentCode: string, currentActive: boolean) {
    try {
      await toggle({ id });
      toast.success(currentActive ? `"${currentCode}" deactivated` : `"${currentCode}" activated`);
    } catch {
      toast.error("Failed to update coupon status");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coupons"
        description="Create and manage discount coupon codes."
        action={
          <Button asChild>
            <Link href="/admin/coupons/new">
              <Plus className="mr-2 h-4 w-4" />
              New coupon
            </Link>
          </Button>
        }
      />

      {coupons === undefined ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded" />
          ))}
        </div>
      ) : coupons.length === 0 ? (
        <EmptyState
          title="No coupons yet"
          description="Create your first coupon code to start offering discounts."
          ctaLabel="New coupon"
          ctaHref="/admin/coupons/new"
          icon={<Ticket className="h-10 w-10" />}
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Max Cap</TableHead>
                <TableHead>Min Cart</TableHead>
                <TableHead>Valid From</TableHead>
                <TableHead>Valid To</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow
                  key={coupon._id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => window.location.href = `/admin/coupons/${coupon._id}`}
                >
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-sm">
                      {coupon.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {coupon.discountValue}% off
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {coupon.maximumDiscount !== undefined
                      ? formatCurrency(coupon.maximumDiscount)
                      : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {coupon.minimumOrderValue !== undefined
                      ? formatCurrency(coupon.minimumOrderValue)
                      : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {coupon.startsAt ? formatDate(coupon.startsAt) : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {coupon.expiresAt ? formatDate(coupon.expiresAt) : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {coupon.usageCount}
                    {coupon.usageLimit !== undefined
                      ? ` / ${coupon.usageLimit}`
                      : " / ∞"}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Switch
                      checked={coupon.isActive}
                      onCheckedChange={() =>
                        handleToggle(coupon._id, coupon.code, coupon.isActive)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/coupons/${coupon._id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
