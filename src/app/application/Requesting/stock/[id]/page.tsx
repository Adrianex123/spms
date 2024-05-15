/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import StockContent from "./stock-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import StockNotFound from "./not-found";
import Skeleton from "./skeleton";
import { useMainStocks } from "@/hooks/useMainStocks";
import { useUOMS } from "@/hooks/useUOMS";

export default function Department({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getStock, currentStock } = useMainStocks();
  const { getUOMS, allUOMSData } = useUOMS();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getStock(params.id, 1000);
      if (result) setError(result);
      getUOMS();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("stock-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "request" },
          (payload: any) => {
            getStock(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      {error ? (
        <StockNotFound />
      ) : currentStock.length === 0 ? (
        <Skeleton />
      ) : (
        <StockContent params={params} stock={currentStock} uoms={allUOMSData} />
      )}
    </div>
  );
}
