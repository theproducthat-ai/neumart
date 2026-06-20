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

  const user = await currentUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

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
