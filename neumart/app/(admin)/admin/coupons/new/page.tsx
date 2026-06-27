"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CouponForm, couponFormValuesToArgs } from "@/components/admin/coupon-form";
import type { CouponFormValues } from "@/components/admin/coupon-form";

export default function NewCouponPage() {
  const router = useRouter();
  const createCoupon = useMutation(api.coupons.createCoupon);

  async function handleSubmit(values: CouponFormValues) {
    await createCoupon(couponFormValuesToArgs(values));
    toast.success("Coupon created.");
    router.push("/admin/coupons");
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
        <h1 className="text-2xl font-bold">New Coupon</h1>
      </div>

      <CouponForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
