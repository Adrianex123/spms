import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useMobileUsers: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allMobileUserData, setAllMobileUserData] = useState<any>([]);
  const [currentMobileUserData, setCurrentMobileUserData] = useState<any>([]);

  const getMobileUsers = async () => {
    const result = await supabase.from("mobile_users").select(`
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,
        points,      
        created_at
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllMobileUserData(data);
  };
  const getMobileUser = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("mobile_users")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,
        points,      
        created_at
      `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentMobileUserData(data);
  };

  return {
    // states
    allMobileUserData,
    currentMobileUserData,

    // methods
    getMobileUser,
    getMobileUsers,
  };
};
