import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Skeleton className="mb-6 h-8 w-40" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="mt-6 h-16 w-full rounded-lg" />
    </div>
  );
}
