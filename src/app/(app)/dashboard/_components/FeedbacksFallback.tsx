"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FeedbackFallback() {
  return (
    <div className="m-20 my-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-[150px] rounded-xl" />
      <Skeleton className=" h-[150px]  rounded-xl" />
      <Skeleton className="h-[150px]  rounded-xl" />
    </div>
  );
}
