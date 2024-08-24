import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  quantity: number;
}

export default function LoadingSkeleton({ quantity }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: quantity }).map((_, index) => (
        <Skeleton key={index} className="h-[100px] rounded-xl" />
      ))}
    </>
  );
}
