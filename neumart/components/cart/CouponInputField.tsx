"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Tag, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";

const ERROR_MESSAGES: Record<string, string> = {
  COUPON_NOT_FOUND: "This coupon code does not exist.",
  COUPON_INACTIVE: "This coupon is no longer active.",
  COUPON_EXPIRED: "This coupon has expired.",
  COUPON_NOT_YET_ACTIVE: "This coupon is not yet valid.",
  COUPON_EXHAUSTED: "This coupon has reached its maximum usage limit.",
  COUPON_PER_USER_LIMIT: "You have already used this coupon the maximum number of times.",
};

interface CouponInputFieldProps {
  subtotal: number; // paise
}

export function CouponInputField({ subtotal }: CouponInputFieldProps) {
  const [inputCode, setInputCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const validate = useMutation(api.coupons.validateCoupon);

  async function handleApply() {
    if (!inputCode.trim()) return;
    setApplying(true);
    setErrorMsg(null);

    try {
      const result = await validate({
        couponCode: inputCode.trim(),
        subtotal,
      });

      if (!result.valid) {
        if (result.error === "COUPON_MINIMUM_NOT_MET") {
          const amount = result.minimumOrderValue / 100;
          setErrorMsg(`Your cart total is below the minimum required for this coupon (₹${amount.toFixed(2)}).`);
        } else {
          setErrorMsg(ERROR_MESSAGES[result.error] ?? "Failed to apply coupon. Please try again.");
        }
        return;
      }

      applyCoupon({
        code: result.code,
        couponId: result.couponId as unknown as string,
        discountAmount: result.discountAmount,
        discountValue: result.discountValue,
        maximumDiscount: result.maximumDiscount,
        minimumOrderValue: result.minimumOrderValue,
      });
      setInputCode("");
    } catch {
      setErrorMsg("Failed to apply coupon. Please try again.");
    } finally {
      setApplying(false);
    }
  }

  function handleRemove() {
    removeCoupon();
    setErrorMsg(null);
    setInputCode("");
  }

  if (appliedCoupon) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 dark:border-green-900 dark:bg-green-950/30">
        <Tag className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
        <span className="flex-1 text-sm font-medium text-green-700 dark:text-green-400">
          <span className="font-mono">{appliedCoupon.code}</span> applied
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-green-700 hover:text-destructive dark:text-green-400"
          onClick={handleRemove}
          aria-label="Remove coupon"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <Input
          value={inputCode}
          onChange={(e) => {
            setInputCode(e.target.value.toUpperCase());
            setErrorMsg(null);
          }}
          placeholder="Coupon code"
          className="font-mono uppercase"
          aria-label="Coupon code"
          disabled={applying}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleApply}
          disabled={applying || !inputCode.trim()}
          className="shrink-0"
        >
          {applying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Apply"
          )}
        </Button>
      </div>
      {errorMsg && (
        <p className="text-xs text-destructive">{errorMsg}</p>
      )}
    </div>
  );
}
