import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useEquipments: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [equipmentsData, setEquipmentsData] = useState<any>([]);
  const [currentEquipmentData, setCurrentEquipmentData] = useState<any>([]);

  const createEquipment = async (props: any, duration?: any) => {
    const result = await supabase.from("equipments").insert({
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
  const getEquipments = async () => {
    const result = await supabase
      .from("equipments")
      .select(
        `
        id,
        name,
        description,
        image_url,
        stock_quantity,
        barcode,
        status,
        created_at
      `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setEquipmentsData(data);
  };
  const getEquipment = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("equipments")
      .select(
        `
          id,
          name,
          description,
          image_url,
          stock_quantity,
          barcode,
          status,
          created_at
        `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentEquipmentData(data);
  };
  const updateEquipment = async (props: any, duration?: number) => {
    const result = await supabase
      .from("equipments")
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
  const updateEquipmentStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("equipments")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteEquipment = async (props: any, duration: number = 2000) => {
    const result = await supabase
      .from("equipments")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    equipmentsData,
    currentEquipmentData,

    // methods
    createEquipment,
    getEquipment,
    getEquipments,
    updateEquipment,
    updateEquipmentStatus,
    deleteEquipment,
  };
};
