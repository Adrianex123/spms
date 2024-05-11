import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useParts: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [partsData, setPartsData] = useState<any>([]);
  const [currentPartData, setCurrentPartData] = useState<any>([]);

  const createPart = async (props: any, duration?: any) => {
    const result = await supabase.from("parts").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      stock_quantity: props.stock_quantity,
      brand_id: props.brand_id,
      price: props.price,
      inventory_id: props.inventory_id,
      barcode: props.barcode,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getParts = async () => {
    const result = await supabase
      .from("parts")
      .select(
        `
        id,
        name,
        description,
        image_url,
        stock_quantity,
        brands(
            id,
            brand_name
        ),
        price,
        barcode,
        status,
        inventory(
          id,
          branches(
              id,
              branch_name,
              branch_location
          )
        ),
        created_at
      `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setPartsData(data);
  };
  const getPart = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("parts")
      .select(
        `
          id,
          name,
          description,
          image_url,
          stock_quantity,
          brands(
            id,
            brand_name
          ),
          price,
          barcode,
          status,
          inventory(
            id,
            branches(
                id,
                branch_name,
                branch_location
            )
          ),
          created_at
        `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentPartData(data);
  };
  const updatePart = async (props: any, duration?: number) => {
    const result = await supabase
      .from("parts")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        barcode: props.barcode,
        brand_id: props.brand_id,
        stock_quantity: props.stock_quantity,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updatePartStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("parts")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deletePart = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("parts").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    partsData,
    currentPartData,

    // methods
    createPart,
    getPart,
    getParts,
    updatePart,
    updatePartStatus,
    deletePart,
  };
};
