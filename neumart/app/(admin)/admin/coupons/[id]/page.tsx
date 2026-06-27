"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CouponForm,
  couponFormValuesToArgs,
  fromApiToCouponFormValues,
} from "@/components/admin/coupon-form";
import type { CouponFormValues } from "@/components/admin/coupon-form";

export default function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();

  const coupon = useQuery(
    api.coupons.getCoupon,
    isAuthenticated ? { id: id as Id<"coupons"> } : "skip"
  );
  const updateCoupon = useMutation(api.coupons.updateCoupon);

  async function handleSubmit(values: CouponFormValues) {
    await updateCoupon({ id: id as Id<"coupons">, ...couponFormValuesToArgs(values) });
    toast.success("Coupon updated.");
    router.push("/admin/coupons");
  }

  if (!isAuthenticated || coupon === undefined) {
    return (
      <div className="space-y-4 max-w-xl">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (coupon === null) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Coupon not found.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/coupons">Back to coupons</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-3">
          <Link href="/admin/coupons">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to coupons
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">
          Edit Coupon:{" "}
          <span className="font-mono">{coupon.code}</span>
        </h1>
      </div>

      <CouponForm
        mode="edit"
        initialValues={fromApiToCouponFormValues(coupon)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
