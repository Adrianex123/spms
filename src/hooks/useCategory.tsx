import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useUOMS: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [categoryData, CATEGORYDATA] = useState<any>([]);
  const [currentCategory, setCurrentCategory] = useState<any>([]);

  const createUOM = async (props: any, duration?: any) => {
    const result = await supabase.from("main_stocks").insert({
      unit_category: props.unit_category,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getUOMS = async () => {
    const result = await supabase.from("main_stocks").select(`
      id,
      unit_category
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }

    return CATEGORYDATA(data);
  };
  const getUOM = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("main_stocks")
      .select(
        `
      id,
      unit_category
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentCategory(data);
  };
  const updateUOM = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_stocks")
      .update({ role: props.unit_category })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteUOM = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_stocks")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    categoryData,
    currentCategory,

    // methods
    createUOM,
    getUOMS,
    getUOM,
    updateUOM,
    deleteUOM,
  };
};
