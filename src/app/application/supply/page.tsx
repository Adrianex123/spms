/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import StocksContent from "./stocks-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useMainStocks } from "@/hooks/useMainStocks";
import { PiRulerBold } from "react-icons/pi";

import { setUOMSData } from "@/redux/slices/uomsSlice";
import { useDispatch } from "react-redux";
import { useUOMS } from "@/hooks/useUOMS";

export default function Stocks() {
  const dispatch = useDispatch();
  const { getStocks, allStocksData } = useMainStocks();
  const { getUOMS, allUOMSData } = useUOMS();

  const uomsData = allUOMSData.map((uom: any) => ({
    id: uom?.id,
    value: uom?.unit_name,
    label: uom?.unit_name,
    icon: PiRulerBold,
  }));

  dispatch(setUOMSData(uomsData));

  useEffect(() => {
    const { error } = getStocks();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getUOMS();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("stocks-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "main_stocks" },
        (payload: any) => {
          getStocks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribedChannel);
    };
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Stocks</h1>
      </div>
      <StocksContent dataStocks={allStocksData} />
    </main>
  );
}
