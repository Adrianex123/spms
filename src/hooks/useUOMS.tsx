import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useUOMS: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allUOMSData, setAllUOMSData] = useState<any>([]);
  const [currentUOMData, setCurrentUOMData] = useState<any>([]);

  const createUOM = async (props: any, duration?: any) => {
    const result = await supabase.from("uoms").insert({
      unit_name: props.unit_name,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getUOMS = async () => {
    const result = await supabase.from("uoms").select(`
      id,
      unit_name
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }

    return setAllUOMSData(data);
  };
  const getUOM = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("uoms")
      .select(
        `
      id,
      unit_name
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentUOMData(data);
  };
  const updateUOM = async (props: any, duration?: number) => {
    const result = await supabase
      .from("uoms")
      .update({ role: props.unit_name })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteUOM = async (props: any, duration?: number) => {
    const result = await supabase.from("uoms").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allUOMSData,
    currentUOMData,

    // methods
    createUOM,
    getUOMS,
    getUOM,
    updateUOM,
    deleteUOM,
  };
};
