import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useInventory: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allInventoryData, setAllInventoryData] = useState<any>([]);
  const [currentInventoryData, setCurrentInventoryData] = useState<any>([]);

  const getAllInventory = async () => {
    const result = await supabase.from("inventory").select(`
      id,
      branches(
        id,
        branch_name,
        branch_location
      ),
      products(
        id,
        name,
        description,
        image_url,
        quantity,
        uom,
        price,
        barcode,
        status,
        created_at
      )
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllInventoryData(data);
  };
  const getInventory = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("inventory")
      .select(
        `
        id,
        branches(
          id,
          branch_name,
          branch_location
        ),
        products(
          id,
          name,
          description,
          image_url,
          quantity,
          uom,
          price,
          barcode,
          status,
          created_at
        )
      `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentInventoryData(data);
  };

  return {
    // states
    allInventoryData,
    currentInventoryData,

    // methods
    getInventory,
    getAllInventory,
  };
};
