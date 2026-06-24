"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { QrCodeDisplay } from "@/components/profile/QrCodeDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-sm px-4 py-8">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <Skeleton className="mb-4 h-7 w-48" />
        <Skeleton className="mb-2 h-5 w-36" />
        <Skeleton className="mb-2 h-5 w-52" />
        <Skeleton className="mb-6 h-5 w-32" />
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-52 w-52 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const user = useQuery(api.users.getCurrentUser);
  const generateQrCode = useMutation(api.users.generateQrCode);

  useEffect(() => {
    if (user !== undefined && user !== null && !user.qrCodeId) {
      generateQrCode();
    }
  }, [user, generateQrCode]);

  if (user === undefined) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return null;
  }

  const isGenerating = !user.qrCodeId;

  return (
    <div className="mx-auto max-w-sm px-4 py-8">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold">My Customer QR Code</h1>

        <div className="mb-6 space-y-1 text-sm">
          {user.name && <p className="font-medium text-base">{user.name}</p>}
          <p className="text-muted-foreground">{user.email}</p>
          {user.customerCode && (
            <p>
              <span className="text-muted-foreground">Customer ID: </span>
              <span className="font-mono font-medium">{user.customerCode}</span>
            </p>
          )}
        </div>

        {isGenerating ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating your QR code...
          </div>
        ) : (
          <QrCodeDisplay
            qrCodeId={user.qrCodeId!}
            customerCode={user.customerCode!}
          />
        )}
      </div>
    </div>
  );
}
