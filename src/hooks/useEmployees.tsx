import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useEmployees: any = () => {
  const [allEmployeesData, setAllEmployeesData] = useState<EmployeeDisplay[]>(
    []
  );
  const [currentEmployeeData, setCurrentEmployeeData] = useState<any>([]);

  const createEmployee = async (props: any, duration: number = 2000) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );

    const result = await supabase.auth.signUp({
      email: props.email,
      password: props.password,
      options: {
        data: {
          first_name: props.first_name,
          last_name: props.last_name,
          image_url: props.image_url,
          address: props.address,
          contact_number: props.contact_number,
          gender: props.gender,
          dob: props.dob,
          role: props.role,
          department: props.department,
          password: props.password,
        },
      },
    });
    console.log(props);
    console.log(result);
    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const getEmployees = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const result = await supabase
      .from("employees")
      .select(
        `
      id,
      email,
      first_name,
      last_name,
      image_url,
      departments (
        id,
        department_name,
        image_url,
        description,
        department_head
      ),
      
      address,
      contact_number,
      gender,
      roles (id, role),
      dob,
      password
    `
      )
      .order("created_at", { ascending: false });
    type EmployeesWithJoin = QueryData<typeof result>;

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return setAllEmployeesData(data as EmployeesWithJoin);
  };
  const getEmployee = async (id: string, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data, error } = await supabase
      .from("employees")
      .select(
        `
      id,
      email,
      first_name,
      last_name,
      image_url,
      departments (
        id,
        department_name,
        image_url,
        description
      ),
      address,
      contact_number,
      gender,
      roles (id, role),
      dob,
      password
    `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentEmployeeData(data);
  };
  const updateEmployee = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );
    const result = await supabase.auth.admin.updateUserById(props.id, {
      email: props.email,
      password: props.password,
      user_metadata: {
        email: props.email,
        first_name: props.first_name,
        last_name: props.last_name,
        image_url: props.image_url,
        address: props.address,
        contact_number: props.contact_number,
        gender: props.gender,
        dob: props.dob,
        role: props.role,
        department: props.department,
        password: props.password,
      },
    });
    console.log(props);
    console.log(result);
    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const updateEmployeeStatus = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );
    const result = await supabase.auth.admin.updateUserById(props.id, {
      user_metadata: {
        status: props.status,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteEmployee = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const result = await supabase.auth.admin.deleteUser(props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // data
    allEmployeesData,
    currentEmployeeData,

    // methods
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
  };
};
