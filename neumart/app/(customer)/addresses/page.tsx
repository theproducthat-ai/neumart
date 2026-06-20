"use client";

import Link from "next/link";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddressesPage() {
  const { isAuthenticated } = useConvexAuth();
  const addresses = useQuery(api.addresses.getUserAddresses, isAuthenticated ? {} : "skip");
  const deleteAddress = useMutation(api.addresses.deleteAddress);
  const setDefault = useMutation(api.addresses.setDefaultAddress);

  async function handleDelete(id: Id<"addresses">) {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteAddress({ addressId: id });
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
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
        <div className="flex flex-col items-center py-16 text-center">
          <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
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
              className="rounded-lg border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-semibold">{addr.name}</span>
                    <span className="text-sm text-muted-foreground">{addr.phone}</span>
                    {addr.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="mr-1 h-3 w-3" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ""}
                    {addr.landmark ? `, Near ${addr.landmark}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {addr.city}, {addr.state} — {addr.pincode}
                    {addr.country && addr.country !== "India" ? `, ${addr.country}` : ""}
                  </p>
                </div>

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
                      <Pencil className="mr-1 h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(addr._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
