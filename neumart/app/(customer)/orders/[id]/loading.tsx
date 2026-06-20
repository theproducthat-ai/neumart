import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailLoading() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Skeleton className="mb-6 h-8 w-32" />
      <Skeleton className="mb-4 h-10 w-48" />
      <Skeleton className="mb-6 h-64 w-full rounded-lg" />
      <Skeleton className="mb-4 h-24 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  );
}
