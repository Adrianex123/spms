import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";

export const useOrderServices: any = () => {
  const uid = new ShortUniqueId({ length: 10 });
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  const [orderServicesData, setOrderServicesData] = useState<any>([]);
  const [currentOrderServiceData, setCurrentOrderServiceData] = useState<any>(
    []
  );

  const createOrderService = async (props: any, duration?: any) => {
    const result: any = await supabase
      .from("order_services")
      .insert({
        customer_first_name: props.customer_first_name,
        customer_last_name: props.customer_last_name,
        customer_email: props.customer_email,
        customer_contact_number: props.customer_contact_number,
        payment_method: props.payment_method,
        employee_id: props.employee_id,
        inventory_id: props.inventory_id,
        supervisor_id: props.supervisor_id,
        subtotal: props.subtotal,
        total_price: props.total_price,
        status: props.status,
        discount: props.discount,
        amount_paid: props.amount_paid,
        remarks: props.remarks,
        mobile_user_id: props.mobile_user_id ? props.mobile_user_id : null,
        redeemed: props.mobile_user_id ? true : false,
        redeem_code: props.mobile_user_id ? null : uid.stamp(11),
      })
      .select();

    if (result.error) {
      return result.error;
    }
    const productResult = await supabase
      .from("purchase_products")
      .insert(
        props.purchase_products.map((product: any) => ({
          order_service_id: result.data[0].id,
          product_id: product.product_id,
          name: product.name,
          description: product.description,
          inventory_id: product.inventory_id,
          image_url: product.image,
          barcode: product.barcode,
          price: product.price,
          quantity: product.quantity,
          uom_name: product.uom_name,
        }))
      )
      .select();

    const partResult = await supabase
      .from("purchase_parts")
      .insert(
        props.purchase_parts.map((part: any) => ({
          order_service_id: result.data[0].id,
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

    const serviceResult = await supabase
      .from("purchase_services")
      .insert(
        props.purchase_services.map((service: any) => ({
          order_service_id: result.data[0].id,
          service_id: service.id,
          name: service.name,
          description: service.description,
          inventory_id: service.inventory_id,
          price: service.price,
          image_url: service.image,
        }))
      )
      .select();
    const vehicleResult = await supabase
      .from("vehicle_entries")
      .insert({
        order_service_id: result.data[0].id,
        type: props.vehicle_entry.vehicle_type,
        car_model: props.vehicle_entry.car_model,
        car_brand: props.vehicle_entry.car_brand,
        plate_number: props.vehicle_entry.plate_number,
        color: props.vehicle_entry.color,
        engine_number: props.vehicle_entry.engine_number,
        odo_reading: props.vehicle_entry.odo_reading,
        chassis_number: props.vehicle_entry.chassis_number,
      })
      .select();
    const progressResult = await supabase
      .from("progress_entries")
      .insert(
        props.progress_entries.map((progress: any) => ({
          order_service_id: result.data[0].id,
          progress_name: progress.progress_name,
          description: progress.description,
        }))
      )
      .select();
    const mechanicResult = await supabase.from("mechanic_entries").insert(
      props.mechanic_entries.map((mechanic: any) => ({
        order_service_id: result.data[0].id,
        employee_id: mechanic,
      }))
    );
    // console.log(result);
    // console.log(productResult);
    // console.log(partResult);
    // console.log(serviceResult);
    // console.log(progressResult);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getOrderServices = async () => {
    const result = await supabase
      .from("order_services")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        employee:employees!public_order_services_employee_id_fkey(
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
        supervisor:employees!order_services_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        payment_method,
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setOrderServicesData(data);
  };
  const getOrderService = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("order_services")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        redeemed,
        redeem_code,
        employee:employees!public_order_services_employee_id_fkey(
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
        supervisor:employees!order_services_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_user:mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
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
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setCurrentOrderServiceData(data);
    return error;
  };
  const updateOrderService = async (props: any, duration?: number) => {
    const result = await supabase
      .from("orders")
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
  const updateOrderServiceStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("orders")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteOrderService = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("orders").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    orderServicesData,
    currentOrderServiceData,

    // methods
    createOrderService,
    getOrderService,
    getOrderServices,
    updateOrderService,
    updateOrderServiceStatus,
    deleteOrderService,
  };
};
