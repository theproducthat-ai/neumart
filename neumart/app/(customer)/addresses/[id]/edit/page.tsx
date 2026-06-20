"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressForm } from "@/components/address/address-form";

export default function EditAddressPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useConvexAuth();
  const address = useQuery(
    api.addresses.getAddressById,
    isAuthenticated ? { addressId: id as Id<"addresses"> } : "skip"
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
        <Link href="/addresses">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to addresses
        </Link>
      </Button>

      {address === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[480px] w-full max-w-lg rounded-lg" />
        </div>
      ) : address === null ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">Address not found.</p>
          <Button asChild className="mt-4">
            <Link href="/addresses">Back to addresses</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit address</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your delivery address details.
            </p>
          </div>
          <AddressForm
            mode="edit"
            addressId={address._id}
            defaultValues={{
              name: address.name,
              phone: address.phone,
              line1: address.line1,
              line2: address.line2 ?? "",
              landmark: address.landmark ?? "",
              city: address.city,
              state: address.state,
              pincode: address.pincode,
              country: address.country ?? "India",
              isDefault: address.isDefault,
            }}
          />
        </>
      )}
    </div>
  );
}
