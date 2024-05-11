import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useBrands: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allBrandsData, setBrandsData] = useState<any>([]);
  const [currentBrandData, setCurrentBrandData] = useState<any>([]);

  const createbrand = async (props: any, duration?: any) => {
    const result = await supabase.from("brands").insert({
      brand_name: props.brand_name,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getBrands = async () => {
    const result = await supabase
      .from("brands")
      .select(
        `
      id,
      brand_name
      
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }

    return setBrandsData(data);
  };
  const getBrand = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("brands")
      .select(
        `
      id,
      role
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentBrandData(data);
  };
  const updateBrand = async (props: any, duration?: number) => {
    const result = await supabase
      .from("brands")
      .update({ brand_name: props.brand_name })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteBrand = async (props: any, duration?: number) => {
    const result = await supabase.from("brands").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allBrandsData,
    currentBrandData,

    // methods
    createbrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand,
  };
};
