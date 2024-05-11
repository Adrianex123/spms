/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import OrderServiceContent from "./order-service-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useOrderServices } from "@/hooks/useOrderServices";
import OrderNotFound from "./not-found";

export default function OrderService({ params }: { params: any }) {
  const { getOrderService, currentOrderServiceData } = useOrderServices();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getOrderService(params.id, 500);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`order-service-follow-up-${params.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "order_services",
            filter: `id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderService(params.id, 0);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "progress_entries",
            filter: `order_service_id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderService(params.id, 0);
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
      {error ? (
        <OrderNotFound />
      ) : currentOrderServiceData.length === 0 ? (
        <Loading />
      ) : (
        <OrderServiceContent
          params={params}
          orderService={currentOrderServiceData}
        />
      )}
    </div>
  );
}
