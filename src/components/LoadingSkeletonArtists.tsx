import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonArtistsProps {
  quantity: number;
}

export default function LoadingSkeletonArtists({
  quantity,
}: LoadingSkeletonArtistsProps) {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {Array.from({ length: quantity }).map((_, index) => (
        <div className="flex flex-col justify-start items-center" key={index}>
          <Skeleton className="rounded-lg w-32 h-32 lg:w-48 lg:h-48" />
        </div>
      ))}
    </div>
  );
}
