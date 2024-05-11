/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import ManagementContent from "./management-content";
import { useEmployees } from "@/hooks/useEmployees";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useDepartments } from "@/hooks/useDepartments";
import { useRoles } from "@/hooks/useRoles";
import { HomeIcon } from "lucide-react";
import { setDepartmentsData } from "@/redux/slices/departmentsSlice";
import { useDispatch } from "react-redux";
import { setRolesData } from "@/redux/slices/rolesSlice";
import { FaRegUser } from "react-icons/fa";

export default function Management() {
  const dispatch = useDispatch();
  const { getEmployees, allEmployeesData } = useEmployees();
  const { getDepartments, allDepartmentsData } = useDepartments();
  const { getRoles, allRolesData } = useRoles();

  const departmentsData = allDepartmentsData.map((department: any) => ({
    id: department?.id,
    value: department?.department_name,
    label: department?.department_name,
    icon: HomeIcon,
  }));
  const rolesData = allRolesData.map((role: any) => ({
    id: role?.id,
    value: role?.role,
    label: role?.role,
    icon: FaRegUser,
  }));
  dispatch(setDepartmentsData(departmentsData));
  dispatch(setRolesData(rolesData));

  useEffect(() => {
    const { error } = getEmployees();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }

    getDepartments();
    getRoles();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("employees-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload: any) => {
          getEmployees();
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
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
      </div>
      <ManagementContent dataEmployees={allEmployeesData} />
    </main>
  );
}
