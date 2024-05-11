import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useRestocks: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allStocksData, setStocksData] = useState<any>([]);
  const [currentStock, setCurrentStockData] = useState<any>([]);
  const [currentUOMData, setCurrentUOMData] = useState<any>([]);

  const createStock = async (props: any, duration?: any) => {
    const result = await supabase.from("request").insert({
      name: props.name,
      description: props.description,
      stock_quantity: props.stock_quantity,
      uom_id: props.uom_id,
      price: props.price,
      category: props.category,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getRequest = async () => {
    const result = await supabase
      .from("request")
      .select(
        `
        id,
        name,
        description,
        stock_quantity,
        uoms(
          id,
          unit_name
        ),
        price,
        category,
        status,
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setStocksData(data);
  };
  const getStocks = async () => {
    const result = await supabase
      .from("request")
      .select(
        `
        id,
        name,
        description,
        image_url,
        stock_quantity,
        uoms(
          id,
          unit_name
        ),
        price,
        category,
        status,
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setStocksData(data);
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
  const getStock = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("request")
      .select(
        `
        id,
        name,
        description,
        image_url,
        stock_quantity,
        uoms(
            id,
            unit_name
        ),
        price,
        category,
        status,
        created_at
      `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentStockData(data);
  };
  const updateStock = async (props: any, duration?: number) => {
    const result = await supabase
      .from("request")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        category: props.category,
        uom_id: props.uom_id,
        stock_quantity: props.stock_quantity,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);
    console.log(result);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateStockStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("request")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteStock = async (props: any, duration: number = 2000) => {
    const result = await supabase
      .from("main_stocks")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
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
    allStocksData,
    currentStock,
    currentUOMData,

    // methods
    createStock,
    getStock,
    getStocks,
    updateStock,
    updateStockStatus,
    deleteStock,
    getRequest,
    getUOM,
    setCurrentUOMData,
    createUOM,
    updateUOM,
  };
};
