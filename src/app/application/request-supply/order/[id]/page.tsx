/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import RequestContent from "./order-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRequests } from "@/hooks/useOrders";
import RequestNotFound from "./not-found";

export default function Request({ params }: { params: any }) {
  const { getRequest, currentRequestData } = useRequests();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getRequest(params.id, 500);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("order-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "requests" },
          (payload: any) => {
            getRequest(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
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
