"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function TransactionSkeleton() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <h1>Loading please wait...</h1>
    </div>
  );
}
