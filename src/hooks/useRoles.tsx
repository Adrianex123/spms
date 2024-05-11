import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useRoles: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allRolesData, setAllRolesData] = useState<any>([]);
  const [currentRoleData, setCurrentRoleData] = useState<any>([]);

  const createRole = async (props: any, duration?: any) => {
    const result = await supabase.from("roles").insert({
      role: props.role,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getRoles = async () => {
    const result = await supabase.from("roles").select(`
      id,
      role
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }

    return setAllRolesData(data);
  };
  const getRole = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("roles")
      .select(
        `
      id,
      role
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentRoleData(data);
  };
  const updateRole = async (props: any, duration?: number) => {
    const result = await supabase
      .from("roles")
      .update({ role: props.role })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteRole = async (props: any, duration?: number) => {
    const result = await supabase.from("roles").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allRolesData,
    currentRoleData,

    // methods
    createRole,
    getRole,
    getRoles,
    updateRole,
    deleteRole,
  };
};
