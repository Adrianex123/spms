"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton() {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-start gap-4">
      <span>Loading...</span>
    </div>
  );
}
