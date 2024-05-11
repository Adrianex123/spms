/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import DepartmentsContent from "./departments-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useDepartments } from "@/hooks/useDepartments";
import { HomeIcon } from "lucide-react";
import { setDepartmentsData } from "@/redux/slices/departmentsSlice";
import { useDispatch } from "react-redux";

export default function Departments() {
  const dispatch = useDispatch();
  const { getDepartments, allDepartmentsData } = useDepartments();

  const departmentsData = allDepartmentsData.map((department: any) => ({
    id: department?.id,
    value: department?.department_name,
    label: department?.department_name,
    icon: HomeIcon,
  }));
  dispatch(setDepartmentsData(departmentsData));

  useEffect(() => {
    const { error } = getDepartments();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("departments-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "departments" },
        (payload: any) => {
          getDepartments();
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
        <h1 className="text-lg font-semibold md:text-2xl">Departments</h1>
      </div>
      <DepartmentsContent dataDepartments={allDepartmentsData} />
    </main>
  );
}
