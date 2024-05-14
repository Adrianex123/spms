// import { createClient } from "@supabase/supabase-js";
// import { useState } from "react";

// export const useOrders: any = () => {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
//   );
//   const [ordersData, setOrdersData] = useState<any>([]);
//   const [currentOrderData, setCurrentOrderData] = useState<any>([]);

//   const createOrder = async (props: any, duration?: any) => {
//     const result: any = await supabase
//       .from("orders")
//       .insert({
//         customer_first_name: props.customer_first_name,
//         customer_last_name: props.customer_last_name,
//         customer_contact_number: props.customer_contact_number,
//         customer_email: props.customer_email,
//         employee_id: props.employee_id,
//         inventory_id: props.inventory_id,
//         subtotal: props.subtotal,
//         total_price: props.total_price,
//         status: props.status,
//         discount: props.discount,
//         payment_method: props.payment_method,
//         amount_paid: props.amount_paid,
//       })
//       .select();

//     if (result.error) {
//       return result.error;
//     }

//     const productResult = await supabase
//       .from("purchase_products")
//       .insert(
//         props.purchase_products.map((product: any) => ({
//           order_id: result.data[0].id,
//           product_id: product.product_id,
//           name: product.name,
//           description: product.description,
//           inventory_id: product.inventory_id,
//           image_url: product.image,
//           barcode: product.barcode,
//           price: product.price,
//           quantity: product.quantity,
//           uom_name: product.uom_name,
//         }))
//       )
//       .select();

//     const partResult = await supabase
//       .from("purchase_parts")
//       .insert(
//         props.purchase_parts.map((part: any) => ({
//           order_id: result.data[0].id,
//           part_id: part.part_id,
//           name: part.name,
//           description: part.description,
//           inventory_id: part.inventory_id,
//           image_url: part.image,
//           barcode: part.barcode,
//           price: part.price,
//           quantity: part.quantity,
//           brand: part.brand_name,
//         }))
//       )
//       .select();

//     await new Promise((resolve) => setTimeout(resolve, duration));

//     return result;
//   };
//   const getOrders = async () => {
//     const result = await supabase
//       .from("orders")
//       .select(
//         `
//         id,
//         customer_first_name,
//         customer_last_name,
//         customer_contact_number,
//         customer_email,
//         employees(
//           id,
//           first_name,
//           last_name,
//           image_url,
//           contact_number,
//           email,
//           roles(
//             role
//           )
//         ),
//         inventory(
//           id,
//           branches(
//             id,
//             branch_name,
//             branch_location
//           )
//         ),
//         purchase_products(
//           id,
//           product_id,
//           name,
//           description,
//           image_url,
//           barcode,
//           price,
//           quantity,
//           uom_name
//         ),
//         purchase_parts(
//           id,
//           part_id,
//           name,
//           description,
//           image_url,
//           barcode,
//           price,
//           quantity,
//           brand
//         ),
//         subtotal,
//         total_price,
//         amount_paid,
//         status,
//         discount,
//         payment_method,
//         created_at
//     `
//       )
//       .order("created_at", { ascending: false });

//     const { data, error } = result;
//     if (error) {
//       return error;
//     }
//     return setOrdersData(data);
//   };
//   const getOrder = async (id: string, duration?: number) => {
//     const { data, error } = await supabase
//       .from("orders")
//       .select(
//         `
//         id,
//         customer_first_name,
//         customer_last_name,
//         customer_contact_number,
//         customer_email,
//         employees(
//           id,
//           first_name,
//           last_name,
//           image_url,
//           contact_number,
//           email,
//           roles(
//             role
//           )
//         ),
//         inventory(
//           id,
//           branches(
//             id,
//             branch_name,
//             branch_location,
//             contact_number
//           )
//         ),
//         purchase_products(
//           id,
//           product_id,
//           name,
//           description,
//           barcode,
//           image_url,
//           price,
//           quantity,
//           uom_name
//         ),
//         purchase_parts(
//           id,
//           part_id,
//           name,
//           description,
//           barcode,
//           image_url,
//           price,
//           quantity,
//           brand
//         ),
//         subtotal,
//         total_price,
//         amount_paid,
//         status,
//         discount,
//         payment_method,
//         created_at
//     `
//       )
//       .eq("id", id);

//     await new Promise((resolve) => setTimeout(resolve, duration));
//     if (data?.length === 0) return true;
//     setCurrentOrderData(data);
//     return error;
//   };
//   const updateOrder = async (props: any, duration?: number) => {
//     const result = await supabase
//       .from("orders")
//       .update({
//         name: props.name,
//         description: props.description,
//         image_url: props.image_url,
//         barcode: props.barcode,
//         uom_id: props.uom_id,
//         stock_quantity: props.stock_quantity,
//         price: props.price,
//         status: props.status,
//       })
//       .eq("id", props.id);

//     await new Promise((resolve) => setTimeout(resolve, duration));
//     return result;
//   };
//   const updateOrderStatus = async (props: any, duration?: number) => {
//     const result = await supabase
//       .from("orders")
//       .update({
//         status: props.status,
//       })
//       .eq("id", props.id);

//     await new Promise((resolve) => setTimeout(resolve, duration));

//     return JSON.stringify(result);
//   };
//   const deleteOrder = async (props: any, duration: number = 2000) => {
//     const result = await supabase.from("orders").delete().eq("id", props.id);

//     await new Promise((resolve) => setTimeout(resolve, duration));
//     return result;
//   };

//   return {
//     // states
//     ordersData,
//     currentOrderData,

//     // methods
//     createOrder,
//     getOrder,
//     getOrders,
//     updateOrder,
//     updateOrderStatus,
//     deleteOrder,
//   };
// };
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
      .from("requests")
      .insert({
        requester_first_name: props.requester_first_name,
        requester_last_name: props.requester_last_name,
        requester_contact_number: props.requester_contact_number,
        requester_email: props.requester_email,
        employee_id: "6232cf7a-000f-4026-a583-96be937a0adf",
        inventory_id: props.inventory_id,
        subtotal: props.subtotal,
        total_price: props.total_price,
        status: props.status,
        discount: props.discount,
        payment_method: props.payment_method,
        amount_paid: props.amount_paid,
      })
      .select();

    if (result.error) {
      return result.error;
    }

    const foodsupplyResult = await supabase
      .from("use_food_supplies")
      .insert(
        props.use_foodsupply.map((foodsupply: any) => ({
          request_id: result.data[0].id,
          foodsupply_id: foodsupply.foodsupply_id,
          name: foodsupply.name,
          description: foodsupply.description,
          inventory_id: foodsupply.inventory_id,
          image_url: foodsupply.image,
          quantity: foodsupply.quantity,
        }))
      )
      .select();

    const EquipmentResult = await supabase
      .from("use_equipments")
      .insert(
        props.use_equipments.map((equipment: any) => ({
          request_id: result.data[0].id,
          stocks: equipment.stocks,
          name: equipment.name,
          description: equipment.description,
          inventory_id: equipment.inventory_id,
          image_url: equipment.image,
          quantity: equipment.quantity,
        }))
      )
      .select();

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getRequests = async () => {
    const result = await supabase
      .from("requests")
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
    console.log(result);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setRequestsData(data);
  };
  const getRequest = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("requests")
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
      .from("requests")
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
      .from("requests")
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
