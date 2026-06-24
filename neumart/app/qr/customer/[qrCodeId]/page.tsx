"use client";

import { use, Suspense } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

function QrScanSkeleton() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Skeleton className="mx-auto mb-6 h-6 w-24" />
        <Skeleton className="mb-2 h-8 w-40" />
        <Skeleton className="mb-1 h-5 w-32" />
      </div>
    </div>
  );
}

function AdminSection({ qrCodeId }: { qrCodeId: string }) {
  const adminData = useQuery(api.users.getCustomerByQrCodeAdmin, { qrCodeId });

  if (!adminData) return null;

  return (
    <div className="mt-4 rounded-lg border border-dashed p-4 text-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Admin View
      </p>
      {adminData.email && (
        <p className="mb-1">
          <span className="text-muted-foreground">Email: </span>
          {adminData.email}
        </p>
      )}
      {adminData.phone && (
        <p className="mb-1">
          <span className="text-muted-foreground">Phone: </span>
          {adminData.phone}
        </p>
      )}
      <p className="mb-1">
        <span className="text-muted-foreground">Orders: </span>
        {adminData.orderCount}
      </p>
      {adminData.lastOrderDate !== null && (
        <p className="mb-3">
          <span className="text-muted-foreground">Last order: </span>
          {formatDate(adminData.lastOrderDate)}
        </p>
      )}
      <Button size="sm" asChild>
        <Link href="/admin/orders">View in Admin</Link>
      </Button>
    </div>
  );
}

function QrScanContent({ qrCodeId }: { qrCodeId: string }) {
  const publicData = useQuery(api.users.getCustomerByQrCode, { qrCodeId });
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (publicData === undefined) {
    return <QrScanSkeleton />;
  }

  if (publicData === null) {
    return (
      <div className="mx-auto max-w-sm px-4 py-12">
        <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-destructive">QR code not found.</p>
        </div>
      </div>
    );
  }

  if (publicData.qrEnabled === false) {
    return (
      <div className="mx-auto max-w-sm px-4 py-12">
        <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-destructive">
            This QR code has been disabled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="mb-4 text-center text-sm font-bold tracking-widest text-muted-foreground uppercase">
          Nuemart
        </p>

        <Badge className="mb-4 text-sm" variant="secondary">
          Nuemart Customer
        </Badge>

        <div className="space-y-1">
          {publicData.name && (
            <p className="text-lg font-semibold">{publicData.name}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Customer ID: <span className="font-mono font-medium text-foreground">{publicData.customerCode}</span>
          </p>
        </div>

        {isAdmin && <AdminSection qrCodeId={qrCodeId} />}
      </div>
    </div>
  );
}

export default function QrScanPage({
  params,
}: {
  params: Promise<{ qrCodeId: string }>;
}) {
  const { qrCodeId } = use(params);
  return (
    <Suspense fallback={<QrScanSkeleton />}>
      <QrScanContent qrCodeId={qrCodeId} />
    </Suspense>
  );
}
