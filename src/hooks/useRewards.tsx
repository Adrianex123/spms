import { QueryData, createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useRewards: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allRewardsData, setAllRewardsData] = useState<any>([]);
  const [currentRewardData, setCurrentRewardData] = useState<any>([]);

  const createReward = async (props: any, duration?: any) => {
    const result = await supabase.from("rewards").insert({
      name: props.name,
      description: props.description,
      points_required: props.points_required,
      stock_quantity: props.stock_quantity,
      image_url: props.image_url,
      inventory_id: props.inventory_id,
      status: props.status,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getRewards = async () => {
    const result = await supabase
      .from("rewards")
      .select(
        `
        id,
        name,
        description,
        points_required,
        image_url,
        status,
        stock_quantity,
        inventory(
            id,
            branches(
                id,
                branch_name,
                branch_location,
                created_at
            )
        )
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }

    return setAllRewardsData(data);
  };
  const getReward = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("rewards")
      .select(
        `
          id,
          name,
          description,
          points_required,
          image_url,
          status,
          stock_quantity,
          inventory(
              id,
              branches(
                  id,
                  branch_name,
                  branch_location,
                  created_at
              )
          ),
          created_at
        `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentRewardData(data);
  };
  const updateReward = async (props: any, duration?: number) => {
    const result = await supabase
      .from("rewards")
      .update({
        name: props.name,
        description: props.description,
        points_required: props.points_required,
        stock_quantity: props.stock_quantity,
        image_url: props.image_url,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteReward = async (props: any, duration?: number) => {
    const result = await supabase.from("rewards").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allRewardsData,
    currentRewardData,

    // methods
    createReward,
    getReward,
    getRewards,
    updateReward,
    deleteReward,
  };
};
