"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export interface CouponFormValues {
  code: string;
  discountValue: number;
  maximumDiscount: number;        // ₹ (display), stored as paise
  minimumOrderValue: number | ""; // ₹ or empty
  usageLimit: number | "";
  perUserLimit: number | "";
  startsAt: string;               // datetime-local string
  expiresAt: string;              // datetime-local string
  isActive: boolean;
}

const EMPTY: CouponFormValues = {
  code: "",
  discountValue: 10,
  maximumDiscount: 0,
  minimumOrderValue: "",
  usageLimit: "",
  perUserLimit: "",
  startsAt: "",
  expiresAt: "",
  isActive: true,
};

interface CouponFormProps {
  initialValues?: Partial<CouponFormValues>;
  onSubmit: (values: CouponFormValues) => Promise<void>;
  mode: "create" | "edit";
}

function parseDatetimeLocal(value: string): number | undefined {
  if (!value) return undefined;
  return new Date(value).getTime();
}

function toDatetimeLocal(ts: number | undefined): string {
  if (!ts) return "";
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromApiToCouponFormValues(coupon: {
  code: string;
  discountValue: number;
  maximumDiscount?: number;
  minimumOrderValue?: number;
  usageLimit?: number;
  perUserLimit?: number;
  startsAt?: number;
  expiresAt?: number;
  isActive: boolean;
}): CouponFormValues {
  return {
    code: coupon.code,
    discountValue: coupon.discountValue,
    maximumDiscount: coupon.maximumDiscount !== undefined ? coupon.maximumDiscount / 100 : 0,
    minimumOrderValue: coupon.minimumOrderValue !== undefined ? coupon.minimumOrderValue / 100 : "",
    usageLimit: coupon.usageLimit !== undefined ? coupon.usageLimit : "",
    perUserLimit: coupon.perUserLimit !== undefined ? coupon.perUserLimit : "",
    startsAt: toDatetimeLocal(coupon.startsAt),
    expiresAt: toDatetimeLocal(coupon.expiresAt),
    isActive: coupon.isActive,
  };
}

export function couponFormValuesToArgs(values: CouponFormValues) {
  return {
    code: values.code.toUpperCase().trim(),
    discountType: "percentage" as const,
    discountValue: values.discountValue,
    maximumDiscount: Math.round(values.maximumDiscount * 100),
    minimumOrderValue: values.minimumOrderValue !== ""
      ? Math.round(Number(values.minimumOrderValue) * 100)
      : undefined,
    usageLimit: values.usageLimit !== "" ? Number(values.usageLimit) : undefined,
    perUserLimit: values.perUserLimit !== "" ? Number(values.perUserLimit) : undefined,
    startsAt: parseDatetimeLocal(values.startsAt),
    expiresAt: parseDatetimeLocal(values.expiresAt),
    isActive: values.isActive,
  };
}

export function CouponForm({ initialValues, onSubmit, mode }: CouponFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<CouponFormValues>({
    ...EMPTY,
    ...initialValues,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof CouponFormValues>(key: K, value: CouponFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!values.code.trim()) {
      setError("Coupon code is required.");
      return;
    }
    if (values.discountValue < 1 || values.discountValue > 100) {
      setError("Discount value must be between 1 and 100.");
      return;
    }
    if (!values.maximumDiscount || values.maximumDiscount <= 0) {
      setError("Maximum discount cap is required and must be greater than 0.");
      return;
    }
    if (values.startsAt && values.expiresAt && values.expiresAt <= values.startsAt) {
      setError("Expiry date must be after start date.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {/* Code */}
      <div className="space-y-1.5">
        <Label htmlFor="code">Coupon Code *</Label>
        <Input
          id="code"
          value={values.code}
          onChange={(e) => set("code", e.target.value.toUpperCase())}
          placeholder="e.g. WELCOME10"
          maxLength={20}
          required
          className="font-mono uppercase"
        />
        <p className="text-xs text-muted-foreground">
          Customers will enter this code at checkout. Auto-uppercased.
        </p>
      </div>

      {/* Discount Type — locked to Percentage in MVP */}
      <div className="space-y-1.5">
        <Label>Discount Type</Label>
        <Input value="Percentage" disabled className="text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Only percentage discounts are supported in this version.</p>
      </div>

      {/* Discount Value */}
      <div className="space-y-1.5">
        <Label htmlFor="discountValue">Discount Value (%) *</Label>
        <Input
          id="discountValue"
          type="number"
          min={1}
          max={100}
          step={1}
          value={values.discountValue}
          onChange={(e) => set("discountValue", Number(e.target.value))}
          required
        />
      </div>

      {/* Max Discount */}
      <div className="space-y-1.5">
        <Label htmlFor="maximumDiscount">Maximum Discount Cap (₹) *</Label>
        <Input
          id="maximumDiscount"
          type="number"
          min={1}
          step={0.01}
          value={values.maximumDiscount || ""}
          onChange={(e) => set("maximumDiscount", Number(e.target.value))}
          placeholder="e.g. 100"
          required
        />
        <p className="text-xs text-muted-foreground">
          The discount will not exceed this amount regardless of cart value.
        </p>
      </div>

      <Separator />

      {/* Min Cart Value */}
      <div className="space-y-1.5">
        <Label htmlFor="minimumOrderValue">Minimum Cart Value (₹)</Label>
        <Input
          id="minimumOrderValue"
          type="number"
          min={0}
          step={0.01}
          value={values.minimumOrderValue}
          onChange={(e) =>
            set("minimumOrderValue", e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Optional"
        />
      </div>

      {/* Usage Limits */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="usageLimit">Total Usage Limit</Label>
          <Input
            id="usageLimit"
            type="number"
            min={1}
            step={1}
            value={values.usageLimit}
            onChange={(e) =>
              set("usageLimit", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Unlimited"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="perUserLimit">Per-User Limit</Label>
          <Input
            id="perUserLimit"
            type="number"
            min={1}
            step={1}
            value={values.perUserLimit}
            onChange={(e) =>
              set("perUserLimit", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Unlimited"
          />
        </div>
      </div>

      {/* Validity window */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="startsAt">Valid From</Label>
          <Input
            id="startsAt"
            type="datetime-local"
            value={values.startsAt}
            onChange={(e) => set("startsAt", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="expiresAt">Valid Until</Label>
          <Input
            id="expiresAt"
            type="datetime-local"
            value={values.expiresAt}
            onChange={(e) => set("expiresAt", e.target.value)}
          />
        </div>
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-3">
        <Switch
          id="isActive"
          checked={values.isActive}
          onCheckedChange={(v) => set("isActive", v)}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting
            ? mode === "create" ? "Creating…" : "Saving…"
            : mode === "create" ? "Create Coupon" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/coupons")}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
