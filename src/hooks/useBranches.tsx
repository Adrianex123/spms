import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";


export const useBranches: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allBranchesData, setAllbranchesData] = useState<any>([]);
  const [currentBranchData, setCurrentBranchData] = useState<any>([]);

  const createBranch = async (props: any, duration?: any) => {
    const result = await supabase.from("branches").insert({
      branch_name: props.branch_name,
      branch_location: props.branch_location,
      branch_manager: props.branch_manager,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getBranches = async () => {
    const result = await supabase
      .from("branches")
      .select(
        `
      id,
      branch_name,
      branch_location,
      branch_manager,
      created_at
    `
      )
      .order("created_at", { ascending: false });;

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllbranchesData(data);
  };
  const getRole = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("branches")
      .select(
        `
      id,
      branch_name,
      branch_location,
      branch_manager,
      created_at
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentBranchData(data);
  };
  const updateBranch = async (props: any, duration?: number) => {
    const result = await supabase
      .from("branches")
      .update({
        branch_name: props.branch_name,
        branch_location: props.branch_location,
        branch_manager: props.branch_manager,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteBranch = async (props: any, duration?: number) => {
    const result = await supabase.from("branches").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allBranchesData,
    currentBranchData,

    // methods
    createBranch,
    getBranches,
    getRole,
    updateBranch,
    deleteBranch,
  };
};
