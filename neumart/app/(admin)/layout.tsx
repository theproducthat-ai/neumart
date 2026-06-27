import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  let role: string | undefined;

  if (process.env.NODE_ENV === "development") {
    // In dev, skip the BAPI call entirely — it hangs when DNS is blocked,
    // causing the admin layout to take 30+ seconds and accumulate open connections.
    // Trust the userId-based fallback for Playwright tests.
    if (
      userId === "user_3FIyF9TExoIqwe6cSfJClu6C7fF" ||
      userId === process.env.ADMIN_USER_ID
    ) {
      role = "admin";
    }
  } else {
    // In production: verify role via Clerk BAPI (currentUser fetches publicMetadata)
    try {
      const user = await currentUser();
      role = (user?.publicMetadata as { role?: string } | undefined)?.role;
    } catch {
      // BAPI unavailable — deny access (fail closed in production)
    }
  }

  if (role !== "admin") redirect("/");

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <SidebarTrigger className="mb-4" />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
