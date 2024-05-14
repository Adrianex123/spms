import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useFoodSupplies: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allFoodSupplies, setAllFoodSupplies] = useState<any>([]);
  const [currentFoodSupplyData, setCurrentFoodSupplyData] = useState<any>([]);

  const createFoodSupply = async (props: any, duration?: any) => {
    const result = await supabase.from("request").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      stock_quantity: props.stock_quantity,
      barcode: props.barcode,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getFoodSupplies = async () => {
    const result = await supabase
      .from("main_stocks")
      .select(
        `
*
        `
      )
      .order("created_at", { ascending: false });
    console.log(result);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllFoodSupplies(data);
  };
  const getFoodSupply = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("main_stocks")
      .select(
        `
*
      `
      )
      .eq("id", id);
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentFoodSupplyData(data);
  };
  const updateFoodSupply = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_stocks")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        barcode: props.barcode,
        stock_quantity: props.stock_quantity,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateFoodSupplyStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("main_stocks")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteFoodSupply = async (props: any, duration: number = 2000) => {
    const result = await supabase
      .from("main_stocks")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    allFoodSupplies,
    currentFoodSupplyData,

    // methods
    createFoodSupply,
    getFoodSupply,
    getFoodSupplies,
    updateFoodSupply,
    updateFoodSupplyStatus,
    deleteFoodSupply,
  };
};
