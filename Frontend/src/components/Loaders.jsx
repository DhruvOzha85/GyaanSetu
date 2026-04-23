import { Skeleton } from "@/components/ui/skeleton";

export function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-6">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-6 w-1/2" />
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 space-y-3">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
