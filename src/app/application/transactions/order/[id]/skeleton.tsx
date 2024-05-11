"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton() {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-start gap-4">
      <Skeleton className="w-[650px] 2xl:w-[55%] h-[720px] 2xl:h-[838px] px-8 pt-4 pb-8  bg-darkComponentBg rounded-xl border border-lightBorder shadow-lg gap-0 relative"></Skeleton>
      <div className="w-[30%] 2xl:w-[25%] h-full flex flex-col gap-4">
        <Skeleton className="w-full h-[663px] 2xl:h-[782px] p-8 bg-darkComponentBg flex flex-col gap-5 2xl:gap-7 rounded-xl shadow-lg border border-lightBorder"></Skeleton>
        <Skeleton className="w-full h-[40px] flex gap-1 bg-darkComponentBg shadow-lg border border-lightBorder"></Skeleton>
      </div>
    </div>
  );
}
