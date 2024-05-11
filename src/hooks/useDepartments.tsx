import { QueryData, createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useDepartments: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [allDepartmentsData, setAllDepartmentsData] = useState<any>([]);
  const [currentDepartment, setCurrentDepartmentData] = useState<any>([]);

  const createDepartment = async (props: any, duration?: any) => {
    const result = await supabase.from("departments").insert({
      department_name: props.department_name,
      description: props.description,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  const getDepartments = async () => {
    const result = await supabase
      .from("departments")
      .select(
        `
      id,
      department_name,
      description,
      image_url,
      created_at
    `
      )
      .order("created_at", { ascending: false });
    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllDepartmentsData(data);
  };

  const getDepartment = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("departments")
      .select(
        `
      id,
      department_name,
      description,
      image_url,
      created_at
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentDepartmentData(data);
  };
  const updateDepartment = async (props: any, duration?: number) => {
    const result = await supabase
      .from("departments")
      .update({
        department_name: props.department_name,
        description: props.description,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteDepartment = async (props: any, duration?: number) => {
    const result = await supabase
      .from("departments")
      .delete()
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allDepartmentsData,
    currentDepartment,

    // methods
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
  };
};
