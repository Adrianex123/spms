import { QueryData, createClient } from "@supabase/supabase-js";

export const useProgressEntries: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  const addProgress = async (props: any, duration?: number) => {
    const result = await supabase
      .from("progress_entries")
      .insert({
        progress_name: props.progress_name,
        description: props.progress_description,
        order_service_id: props.order_service_id,
      })
      .select();

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const undoProgress = async (props: any, duration?: number) => {
    const result = await supabase
      .from("progress_entries")
      .delete()
      .eq("id", props.order_service_id)
      .select();

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // methods
    addProgress,
    undoProgress,
  };
};
