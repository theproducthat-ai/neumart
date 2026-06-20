import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Skeleton className="mb-6 h-8 w-32" />
      <Skeleton className="mb-8 h-10 w-40" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
