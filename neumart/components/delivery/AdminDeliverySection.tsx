"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type FailedReasonCode =
  | "customer_unavailable"
  | "wrong_address"
  | "customer_refused"
  | "delivery_person_unavailable"
  | "order_damaged"
  | "payment_issue"
  | "unable_to_contact"
  | "other";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Truck } from "lucide-react";
import { formatDateTime } from "@/lib/format";

const FAILED_REASON_LABELS: Record<string, string> = {
  customer_unavailable: "Customer unavailable",
  wrong_address: "Wrong address",
  customer_refused: "Customer refused delivery",
  delivery_person_unavailable: "Delivery person unavailable",
  order_damaged: "Order damaged",
  payment_issue: "Payment issue",
  unable_to_contact: "Unable to contact customer",
  other: "Other",
};

type DeliveryStatus =
  | "pending"
  | "assigned"
  | "picked_up"
  | "out_for_delivery"
  | "delivered"
  | "failed"
  | "cancelled";

function statusVariant(
  status: DeliveryStatus
): "default" | "secondary" | "outline" | "destructive" {
  if (status === "delivered") return "outline";
  if (status === "failed" || status === "cancelled") return "destructive";
  if (status === "pending") return "secondary";
  return "secondary";
}

function statusLabel(status: DeliveryStatus): string {
  const labels: Record<DeliveryStatus, string> = {
    pending: "Pending",
    assigned: "Assigned",
    picked_up: "Picked Up",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    failed: "Failed",
    cancelled: "Cancelled",
  };
  return labels[status] ?? status;
}

export function AdminDeliverySection({ orderId }: { orderId: Id<"orders"> }) {
  const task = useQuery(api.delivery.getDeliveryTaskByOrder, { orderId });
  const assignDelivery = useMutation(api.delivery.assignDelivery);
  const updateDeliveryStatus = useMutation(api.delivery.updateDeliveryStatus);
  const setFailedDelivery = useMutation(api.delivery.setFailedDelivery);
  const cancelDelivery = useMutation(api.delivery.cancelDelivery);

  // Assign form state
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedContact, setAssignedContact] = useState("");
  const [assigning, setAssigning] = useState(false);

  // Failed form state
  const [showFailedForm, setShowFailedForm] = useState(false);
  const [failedReasonCode, setFailedReasonCode] = useState("");
  const [failedReasonNotes, setFailedReasonNotes] = useState("");
  const [submittingFailed, setSubmittingFailed] = useState(false);

  // Cancel confirm state
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelledReason, setCancelledReason] = useState("");
  const [cancelling, setCancelling] = useState(false);

  // Status transition button loading
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function handleAssign() {
    if (!task || task.status !== "pending") return;
    if (!assignedTo.trim()) {
      toast.error("Delivery person name is required.");
      return;
    }
    setAssigning(true);
    try {
      await assignDelivery({
        deliveryTaskId: task._id,
        assignedTo: assignedTo.trim(),
        assignedContact: assignedContact.trim() || undefined,
      });
      toast.success("Delivery assigned successfully.");
      setAssignedTo("");
      setAssignedContact("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAssigning(false);
    }
  }

  async function handleUpdateStatus(
    newStatus: "picked_up" | "out_for_delivery" | "delivered"
  ) {
    if (!task) return;
    setUpdatingStatus(true);
    try {
      await updateDeliveryStatus({ deliveryTaskId: task._id, newStatus });
      toast.success("Delivery status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleSetFailed() {
    if (!task) return;
    if (!failedReasonCode) {
      toast.error("Please select a failure reason.");
      return;
    }
    if (failedReasonCode === "other" && !failedReasonNotes.trim()) {
      toast.error("Please add notes when selecting Other.");
      return;
    }
    setSubmittingFailed(true);
    try {
      await setFailedDelivery({
        deliveryTaskId: task._id,
        failedReasonCode: failedReasonCode as FailedReasonCode,
        failedReasonNotes: failedReasonNotes.trim() || undefined,
      });
      toast.success("Delivery marked as failed.");
      setShowFailedForm(false);
      setFailedReasonCode("");
      setFailedReasonNotes("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmittingFailed(false);
    }
  }

  async function handleCancel() {
    if (!task) return;
    setCancelling(true);
    try {
      await cancelDelivery({
        deliveryTaskId: task._id,
        cancelledReason: cancelledReason.trim() || undefined,
      });
      toast.success("Delivery cancelled.");
      setShowCancelConfirm(false);
      setCancelledReason("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCancelling(false);
    }
  }

  // Loading
  if (task === undefined) {
    return (
      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Delivery</h2>
        </div>
        <Separator />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // No task
  if (task === null) {
    return (
      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Delivery</h2>
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Delivery information not available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-semibold">Delivery</h2>
      </div>
      <Separator />

      {/* PENDING — assign form */}
      {task.status === "pending" && (
        <div className="space-y-3">
          <Badge variant={statusVariant(task.status)}>
            {statusLabel(task.status)}
          </Badge>
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Delivery person name</Label>
            <Input
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedContact">Contact number</Label>
            <Input
              id="assignedContact"
              value={assignedContact}
              onChange={(e) => setAssignedContact(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <Button
            className="w-full"
            onClick={handleAssign}
            disabled={assigning}
          >
            {assigning ? "Assigning…" : "Assign Delivery"}
          </Button>
        </div>
      )}

      {/* ASSIGNED */}
      {task.status === "assigned" && (
        <div className="space-y-3">
          <Badge variant={statusVariant(task.status)}>
            {statusLabel(task.status)}
          </Badge>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">Assigned to: </span>
              <span className="font-medium">{task.assignedTo}</span>
            </p>
            {task.assignedContact && (
              <p>
                <span className="text-muted-foreground">Contact: </span>
                <span>{task.assignedContact}</span>
              </p>
            )}
            {task.assignedAt && (
              <p className="text-muted-foreground text-xs">
                Assigned at {formatDateTime(task.assignedAt)}
              </p>
            )}
          </div>
          <Button
            className="w-full"
            onClick={() => handleUpdateStatus("picked_up")}
            disabled={updatingStatus}
          >
            {updatingStatus ? "Updating…" : "Mark as Picked Up"}
          </Button>
          {!showCancelConfirm ? (
            <button
              className="text-sm text-destructive hover:underline"
              onClick={() => setShowCancelConfirm(true)}
            >
              Cancel Delivery
            </button>
          ) : (
            <div className="space-y-2 rounded-md border border-destructive/30 p-3">
              <p className="text-sm font-medium text-destructive">
                Confirm cancellation
              </p>
              <Input
                placeholder="Reason (optional)"
                value={cancelledReason}
                onChange={(e) => setCancelledReason(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling…" : "Confirm Cancel"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCancelledReason("");
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PICKED UP */}
      {task.status === "picked_up" && (
        <div className="space-y-3">
          <Badge variant={statusVariant(task.status)}>
            {statusLabel(task.status)}
          </Badge>
          {task.pickedUpAt && (
            <p className="text-xs text-muted-foreground">
              Picked up at {formatDateTime(task.pickedUpAt)}
            </p>
          )}
          <Button
            className="w-full"
            onClick={() => handleUpdateStatus("out_for_delivery")}
            disabled={updatingStatus}
          >
            {updatingStatus ? "Updating…" : "Mark as Out for Delivery"}
          </Button>
          {!showCancelConfirm ? (
            <button
              className="text-sm text-destructive hover:underline"
              onClick={() => setShowCancelConfirm(true)}
            >
              Cancel Delivery
            </button>
          ) : (
            <div className="space-y-2 rounded-md border border-destructive/30 p-3">
              <p className="text-sm font-medium text-destructive">
                Confirm cancellation
              </p>
              <Input
                placeholder="Reason (optional)"
                value={cancelledReason}
                onChange={(e) => setCancelledReason(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling…" : "Confirm Cancel"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCancelledReason("");
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* OUT FOR DELIVERY */}
      {task.status === "out_for_delivery" && (
        <div className="space-y-3">
          <Badge variant={statusVariant(task.status)}>
            {statusLabel(task.status)}
          </Badge>
          {task.outForDeliveryAt && (
            <p className="text-xs text-muted-foreground">
              Out for delivery since {formatDateTime(task.outForDeliveryAt)}
            </p>
          )}
          <Button
            className="w-full"
            onClick={() => handleUpdateStatus("delivered")}
            disabled={updatingStatus}
          >
            {updatingStatus ? "Updating…" : "Mark as Delivered"}
          </Button>
          {!showFailedForm && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowFailedForm(true)}
              disabled={updatingStatus}
            >
              Mark as Failed
            </Button>
          )}
          {showFailedForm && (
            <div className="space-y-3 rounded-md border p-3">
              <p className="text-sm font-medium">Mark delivery as failed</p>
              <div className="space-y-2">
                <Label>Failure reason</Label>
                <Select
                  value={failedReasonCode}
                  onValueChange={setFailedReasonCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FAILED_REASON_LABELS).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              {failedReasonCode === "other" && (
                <div className="space-y-2">
                  <Label>Notes (required)</Label>
                  <Textarea
                    value={failedReasonNotes}
                    onChange={(e) => setFailedReasonNotes(e.target.value)}
                    placeholder="Describe what happened"
                    rows={3}
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleSetFailed}
                  disabled={submittingFailed}
                >
                  {submittingFailed
                    ? "Submitting…"
                    : "Confirm Failed Delivery"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowFailedForm(false);
                    setFailedReasonCode("");
                    setFailedReasonNotes("");
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
          {!showCancelConfirm ? (
            <button
              className="text-sm text-destructive hover:underline"
              onClick={() => setShowCancelConfirm(true)}
            >
              Cancel Delivery
            </button>
          ) : (
            <div className="space-y-2 rounded-md border border-destructive/30 p-3">
              <p className="text-sm font-medium text-destructive">
                Confirm cancellation
              </p>
              <Input
                placeholder="Reason (optional)"
                value={cancelledReason}
                onChange={(e) => setCancelledReason(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling…" : "Confirm Cancel"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCancelledReason("");
                  }}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DELIVERED — read-only */}
      {task.status === "delivered" && (
        <div className="space-y-2">
          <Badge variant="outline">Delivered</Badge>
          {task.deliveredAt && (
            <p className="text-xs text-muted-foreground">
              Delivered at {formatDateTime(task.deliveredAt)}
            </p>
          )}
        </div>
      )}

      {/* FAILED — read-only */}
      {task.status === "failed" && (
        <div className="space-y-2">
          <Badge variant="destructive">Failed</Badge>
          {task.failedAt && (
            <p className="text-xs text-muted-foreground">
              Failed at {formatDateTime(task.failedAt)}
            </p>
          )}
          {task.failedReasonCode && (
            <p className="text-sm">
              <span className="text-muted-foreground">Reason: </span>
              {FAILED_REASON_LABELS[task.failedReasonCode] ??
                task.failedReasonCode}
            </p>
          )}
          {task.failedReasonNotes && (
            <p className="text-sm text-muted-foreground">
              {task.failedReasonNotes}
            </p>
          )}
        </div>
      )}

      {/* CANCELLED — read-only */}
      {task.status === "cancelled" && (
        <div className="space-y-2">
          <Badge variant="destructive">Cancelled</Badge>
          {task.cancelledAt && (
            <p className="text-xs text-muted-foreground">
              Cancelled at {formatDateTime(task.cancelledAt)}
            </p>
          )}
          {task.cancelledReason && (
            <p className="text-sm text-muted-foreground">
              {task.cancelledReason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
