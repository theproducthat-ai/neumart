"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdjustStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: Id<"products">;
  productName: string;
  currentStock: number;
}

type AdjustmentType = "restock" | "deduct" | "correction";

export function AdjustStockDialog({
  open,
  onOpenChange,
  productId,
  productName,
  currentStock,
}: AdjustStockDialogProps) {
  const adjustStock = useMutation(api.inventory.adminAdjustStock);

  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>("restock");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setAdjustmentType("restock");
    setQuantity("");
    setReason("");
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function previewStock(): number | null {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 0) return null;
    if (adjustmentType === "restock") return currentStock + qty;
    if (adjustmentType === "deduct") return Math.max(currentStock - qty, 0);
    return qty; // correction
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const qty = parseInt(quantity, 10);

    if (isNaN(qty) || qty < 0) {
      toast.error("Enter a valid quantity");
      return;
    }
    if (adjustmentType !== "correction" && qty <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    if (!reason.trim()) {
      toast.error("Reason is required");
      return;
    }

    setSubmitting(true);
    try {
      await adjustStock({ productId, adjustmentType, quantity: qty, reason });
      toast.success("Stock updated");
      handleOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update stock");
    } finally {
      setSubmitting(false);
    }
  }

  const preview = previewStock();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Stock — {productName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
            Current stock: <span className="font-semibold">{currentStock}</span>
            {preview !== null && preview !== currentStock && (
              <span className="ml-2 text-muted-foreground">
                → <span className="font-semibold text-foreground">{preview}</span>
              </span>
            )}
          </div>

          {/* Adjustment type */}
          <div className="space-y-1.5">
            <Label>Adjustment type</Label>
            <Select
              value={adjustmentType}
              onValueChange={(v) => setAdjustmentType(v as AdjustmentType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restock">Restock / Add stock</SelectItem>
                <SelectItem value="deduct">Deduct stock</SelectItem>
                <SelectItem value="correction">Correct stock (set exact value)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <Label htmlFor="qty">
              {adjustmentType === "correction" ? "New stock value" : "Quantity"}
            </Label>
            <Input
              id="qty"
              type="number"
              min={0}
              placeholder={adjustmentType === "correction" ? "Enter new stock total" : "Enter quantity"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Reason */}
          <div className="space-y-1.5">
            <Label htmlFor="reason">Reason <span className="text-destructive">*</span></Label>
            <Input
              id="reason"
              type="text"
              placeholder="e.g. Supplier delivery, damaged goods, stock count correction"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save adjustment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
