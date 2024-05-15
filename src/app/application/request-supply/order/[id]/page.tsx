/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import RequestContent from "./order-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRequests } from "@/hooks/useOrders";
import RequestNotFound from "./not-found";
import { useRestocks } from "@/hooks/useReStocks";
import { useUOMS } from "@/hooks/useUOMS";
import { useDispatch } from "react-redux";

export default function Request({ params }: { params: any }) {
  const dispatch = useDispatch();
  const { getRequest, currentRequestData } = useRequests();
  const [error, setError] = useState(false);
  const { getStocks, allStocksData } = useRestocks();
  const { getUOMS, allUOMSData } = useUOMS();
  useEffect(() => {
    const initialFetch = async () => {
      const result = await getRequest(params.id, 500);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("stocks-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "request" },
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
    <div className="w-full flex justify-center place-items-center">
      {/* {error ? (
      ) : currentOrderData.length === 0 ? (
        <Loading />
      ) : (
      )} */}
      <RequestNotFound />
      <RequestContent params={params} order={currentRequestData} />
    </div>
  );
}
