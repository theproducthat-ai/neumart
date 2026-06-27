import { Tag } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface DiscountLineItemProps {
  code: string;
  discountAmount: number; // paise
}

export function DiscountLineItem({ code, discountAmount }: DiscountLineItemProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400">
        <Tag className="h-3.5 w-3.5" />
        Coupon{" "}
        <span className="font-mono font-semibold">{code}</span>
      </span>
      <span className="font-medium text-green-700 dark:text-green-400">
        −{formatCurrency(discountAmount)}
      </span>
    </div>
  );
}
