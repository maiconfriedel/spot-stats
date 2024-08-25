import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  quantity: number;
}

export default function LoadingSkeleton({ quantity }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: quantity }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton key={index} className="w-16 h-16 rounded-lg" />
          <div>
            <Skeleton className="w-32 h-5 rounded-none" />
            <Skeleton className="w-32 h-3 rounded-none mt-2" />
          </div>
        </div>
      ))}
    </>
  );
}
