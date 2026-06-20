import { Suspense } from "react";
import { CustomerHeader } from "@/components/layout/customer-header";
import { UserSync } from "@/components/providers/user-sync";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <CustomerHeader />
      </Suspense>
      <UserSync />
      <main className="flex-1">{children}</main>
    </div>
  );
}
