"use client";

import { useState } from "react";
import Link from "next/link";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AddressesPage() {
  const { isAuthenticated } = useConvexAuth();
  const addresses = useQuery(api.addresses.getUserAddresses, isAuthenticated ? {} : "skip");
  const deleteAddress = useMutation(api.addresses.deleteAddress);
  const setDefault = useMutation(api.addresses.setDefaultAddress);

  const [pendingDelete, setPendingDelete] = useState<Id<"addresses"> | null>(null);

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    try {
      await deleteAddress({ addressId: pendingDelete });
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    } finally {
      setPendingDelete(null);
    }
  }

  async function handleSetDefault(id: Id<"addresses">) {
    try {
      await setDefault({ addressId: id });
      toast.success("Default address updated");
    } catch {
      toast.error("Failed to update default");
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Addresses</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your delivery addresses.
            </p>
          </div>
          <Button asChild>
            <Link href="/addresses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add address
            </Link>
          </Button>
        </div>

        {addresses === undefined ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-lg" />
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-1 text-lg font-semibold">No addresses yet</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Add a delivery address to continue to checkout.
            </p>
            <Button asChild>
              <Link href="/addresses/new">Add your first address</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`rounded-lg border p-4 transition-colors ${
                  addr.isDefault ? "border-primary/40 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {/* Name row */}
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{addr.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {addr.phone}
                      </span>
                      {addr.isDefault && (
                        <Badge className="gap-1 text-xs">
                          <Star className="h-3 w-3 fill-current" />
                          Default
                        </Badge>
                      )}
                    </div>

                    {/* Address lines */}
                    <address className="not-italic text-sm text-muted-foreground">
                      <p>
                        {addr.line1}
                        {addr.line2 ? `, ${addr.line2}` : ""}
                        {addr.landmark ? `, Near ${addr.landmark}` : ""}
                      </p>
                      <p>
                        {addr.city}, {addr.state} — {addr.pincode}
                        {addr.country && addr.country !== "India"
                          ? `, ${addr.country}`
                          : ""}
                      </p>
                    </address>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    {!addr.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(addr._id)}
                      >
                        Set default
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/addresses/${addr._id}/edit`}>
                        <Pencil className="mr-1.5 h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setPendingDelete(addr._id)}
                      aria-label={`Delete address for ${addr.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete address?</AlertDialogTitle>
            <AlertDialogDescription>
              This address will be permanently removed. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
