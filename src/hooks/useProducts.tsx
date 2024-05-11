import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useProducts: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [productsData, setProductsData] = useState<any>([]);
  const [currentProductData, setCurrentProductData] = useState<any>([]);

  const createProduct = async (props: any, duration?: any) => {
    const result = await supabase.from("products").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      stock_quantity: props.stock_quantity,
      uom_id: props.uom_id,
      price: props.price,
      inventory_id: props.inventory_id,
      barcode: props.barcode,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getProducts = async () => {
    const result = await supabase
      .from("products")
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
    return setProductsData(data);
  };
  const getProduct = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("products")
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
    return setCurrentProductData(data);
  };
  const updateProduct = async (props: any, duration?: number) => {
    const result = await supabase
      .from("products")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        barcode: props.barcode,
        uom_id: props.uom_id,
        stock_quantity: props.stock_quantity,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateProductStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("products")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteProduct = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("products").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    productsData,
    currentProductData,

    // methods
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    updateProductStatus,
    deleteProduct,
  };
};
