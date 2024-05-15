import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useRequests: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [requestsData, setRequestsData] = useState<any>([]);
  const [currentRequestData, setCurrentRequestData] = useState<any>([]);

  const createRequest = async (props: any, duration?: any) => {
    const result: any = await supabase
      .from("request")
      .insert({
        // customer_first_name: props.customer_first_name,
        // customer_last_name: props.customer_last_name,
        // customer_contact_number: props.customer_contact_number,
        // customer_email: props.customer_email,
        // employee_id: props.employee_id,
        // inventory_id: props.inventory_id,
        // subtotal: props.subtotal,
        total_price: props.total_price,
        // status: props.status,
      })
      .select();

    if (result.error) {
      return result.error;
    }

    const request = await supabase
      .from("request")
      .insert(
        props.purchase_products.map((product: any) => ({
          // request_id: result.data[0].id,
          main_stocks_id: product.product_id,
          name: product.name,
          description: product.description,
          inventory_id: product.inventory_id,
          image_url: product.image,
          barcode: product.barcode,
          price: product.total_price,
          quantity: product.quantity,
          uom_name: product.uom_name,
        }))
      )
      .select();

    const partResult = await supabase
      .from("request")
      .insert(
        props.purchase_parts.map((part: any) => ({
          order_id: result.data[0].id,
          part_id: part.part_id,
          name: part.name,
          description: part.description,
          inventory_id: part.inventory_id,
          image_url: part.image,
          barcode: part.barcode,
          price: part.price,
          quantity: part.quantity,
          brand: part.brand_name,
        }))
      )
      .select();

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  const getRequests = async () => {
    const result = await supabase
      .from("request")
      .select(
        `            
        id,
        created_at,
        status,
        requester_first_name,
        requester_last_name,

        employees(
        id,
        first_name,
        last_name,
        image_url,
        contact_number,
        email,
        roles(role)),
        
        calamity_types(
        id,
        name,
        description)

      `
        // id,
        // requester_first_name,
        // requester_last_name,
        // requester_contact_number,
        // requester_email,
        // created_at

        // requesters(
        //   id,
        //   first_name,
        //   last_name,
        //   image_url,
        //   contact_number,
        //   email,
        // ),

        // employees(
        //     id,
        //     first_name,
        //     last_name,
        //     image_url,
        //     contact_number,
        //     email,
        //     roles(
        //         role
        //       )
        //     ),
        //     inventory(
        //         id,
        //         branches(
        //             id,
        //     branch_name,
        //     branch_location
        //   )
        // ),
        // use_products(
        //     id,
        //     product_id,
        //     name,
        //     description,
        //   image_url,
        //   barcode,
        //   price,
        //   quantity,
        //   uom_name
        // ),
        // use_parts(
        //     id,
        //   part_id,
        //   name,
        //   description,
        //   image_url,
        //   barcode,
        //   price,
        //   quantity,
        //   brand
        // ),
        // subtotal,
        // total_price,
        // amount_paid,
        // status,
        // discount,
        // payment_method,
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setRequestsData(data);
  };
  const getRequest = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("request")
      .select(
        `
        id,
        requester_first_name,
        requester_last_name,
        requester_contact_number,
        requester_email,
        employees(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        inventory(
          id,
          branches(
            id,
            branch_name,
            branch_location,
            contact_number
          )
        ),
        use_products(
          id,
          product_id,
          name,
          description,
          barcode,
          image_url,
          price,
          quantity,
          uom_name
        ),
        use_parts(
          id,
          part_id,
          name,
          description,
          barcode,
          image_url,
          price,
          quantity,
          brand
        ),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        payment_method,
        created_at
    `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setCurrentRequestData(data);
    return error;
  };
  const updateRequest = async (props: any, duration?: number) => {
    const result = await supabase
      .from("request")
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
  const updateRequestStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("request")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteRequest = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("requests").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    requestsData,
    currentRequestData,

    // methods
    createRequest,
    getRequest,
    getRequests,
    updateRequest,
    updateRequestStatus,
    deleteRequest,
  };
};
