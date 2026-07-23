import { LoadingSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <LoadingSkeleton />
    </div>
  );
}
