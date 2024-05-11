/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import DepartmentContent from "./department-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import DepartmentNotFound from "./not-found";
import Skeleton from "./skeleton";
import { useDepartments } from "@/hooks/useDepartments";

export default function Department({ params }: { params: any }) {
  const [error, setError] = useState(null);
  const { getDepartment, currentDepartment } = useDepartments();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getDepartment(params.id, 1000);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("department-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "departments" },
          (payload: any) => {
            getDepartment(params.id, 0);
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
        <DepartmentNotFound />
      ) : currentDepartment.length === 0 ? (
        <Skeleton />
      ) : (
        <DepartmentContent params={params} department={currentDepartment} />
      )}
    </div>
  );
}
