import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressForm } from "@/components/address/address-form";

export default function NewAddressPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
        <Link href="/addresses">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to addresses
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">New address</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a delivery address to your account.
        </p>
      </div>

      <AddressForm mode="create" />
    </div>
  );
}
