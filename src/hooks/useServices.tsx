import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useServices: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [servicesData, setServicesData] = useState<any>([]);
  const [currentServiceData, setCurrentServiceData] = useState<any>([]);

  const createService = async (props: any, waitDuration?: any) => {
    const result = await supabase.from("services").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      duration: props.duration,
      price: props.price,
      inventory_id: props.inventory_id,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, waitDuration));

    return result;
  };
  const getServices = async () => {
    const result = await supabase
      .from("services")
      .select(
        `
        id,
        name,
        description,
        image_url,
        price,
        duration,
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
    return setServicesData(data);
  };
  const getService = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("services")
      .select(
        `
        id,
        name,
        description,
        image_url,
        price,
        duration,
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
    return setCurrentServiceData(data);
  };
  const updateService = async (props: any, waitDuration?: number) => {
    const result = await supabase
      .from("services")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        duration: props.duration,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, waitDuration));
    return result;
  };
  const updateServiceStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("services")
      .update({
        status: props.status,
      })
      .eq("id", props.id);
    console.log(result);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  const deleteService = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("services").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    servicesData,
    currentServiceData,

    // methods
    createService,
    getService,
    getServices,
    updateService,
    updateServiceStatus,
    deleteService,
  };
};
