"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BranchInput from "./branch-input";
import PaymentInput from "./payment-input";
import StatusInput from "./status-input";

import { DataTable as ProductsCart } from "./add-order-cart/products-cart/data-table";
import { DataTable as PartsCart } from "./add-order-cart/parts-cart/data-table";
import { DataTable as ServicesCart } from "./add-order-cart/services-cart/data-table";

import { initiateColumns as initiateProductsCartColumns } from "./add-order-cart/products-cart/columns";
import { initiateColumns as initiatePartsCartColumns } from "./add-order-cart/parts-cart/columns";
import { initiateColumns as initiateServicesCartColumns } from "./add-order-cart/services-cart/columns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useOrderServices } from "@/hooks/useOrderServices";
import { useSelector } from "react-redux";
import OrderCartOptions from "./add-order-table/lists";
import { useDispatch } from "react-redux";
import { resetOrderCart } from "@/redux/slices/orderCartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import DiscountInput from "./discount-input";
import { TbCurrencyPeso } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { resetOrderServiceCart } from "@/redux/slices/orderServiceCartSlice";
import MultiSelectFormField from "@/components/ui/multi-select";
import SupervisorInput from "./supervisor-input";
import MobileUserInput from "./mobile-user-input";
import VehicleTypeInput from "./vehicle-type-input";

export default function OrderForm({ setDialogOpen }: any) {
  const currentUser = useSelector((state: any) => state.currentSession);
  const [isPending, startTransition] = useTransition();
  const { createOrderService } = useOrderServices();
  const dispatch = useDispatch();
  const router = useRouter();

  const orderCart = useSelector((state: any) => state.orderCart);
  const orderServiceCart = useSelector((state: any) => state.orderServiceCart);
  const orderCartOptions = useSelector(
    (state: any) => state.orderCartOptionSlice
  );
  const allMobileUsers = useSelector(
    (state: any) => state.allMobileUser.allMobileUser
  ).map((mobileUser: any) => mobileUser);

  const allMechanics = useSelector(
    (state: any) => state.allEmployees.allMechanics
  )
    .map((mechanic: any) => ({
      value: mechanic.id,
      label: mechanic.first_name + " " + mechanic.last_name,
      branch: mechanic.branches.id,
    }))
    .filter((mechanic: any) => mechanic.value !== currentUser.id)
    .filter((mechanic: any) => {
      if (currentUser.roles.role === "Administrator") {
        return true;
      } else {
        return mechanic.branch === currentUser.branches.id;
      }
    });

  const [minTotalPrice, setMinTotalPrice] = useState(0);
  const [min, setMin] = useState(0);
  const [mobileUserData, setMobileUserData] = useState<any>({});

  const orderServiceSchema: any = z.object({
    // Basic Information
    customer_first_name: z.string(),
    customer_last_name: z.string(),
    customer_email: z.string().nullable(),
    customer_contact_number: z.coerce.number().nullable(),
    payment_method: z.string().nullable(),
    inventory_id: z
      .string()
      .min(1, { message: "Branch is required" })
      .transform((arg) => new Number(arg)),
    supervisor_id: z.string().min(1, { message: "Supervisor is required" }),
    employee_id: z.string(),
    mobile_user_id: z.string().nullable(),
    discount: z.string().transform((arg) => new Number(arg)),
    tax: z.coerce.number(),
    subtotal: z.coerce.number(),
    total_price: z.coerce.number().nullable(),
    status: z.string(),
    amount_paid: z.coerce.number().min(min, {
      message: "Amount paid should be equal or greater than total price",
    }),
    remarks: z.string().nullable(),

    // Vehicle Information
    vehicle_entry: z.object({
      vehicle_type: z.string(),
      car_model: z.string().nullable(),
      car_brand: z.string(),
      plate_number: z.string().toUpperCase(),
      color: z.string().nullable(),
      engine_number: z.string().nullable(),
      odo_reading: z.coerce.number().nullable(),
      chassis_number: z.string().nullable(),
    }),

    // Collections
    purchase_products: z.array(
      z.object({
        product_id: z.coerce.number().nullable(),
        inventory_id: z.coerce.number().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string().nullable(),
        barcode: z.string().nullable(),
        uom_name: z.string().nullable(),
        quantity: z.coerce.number().nullable(),
        price: z.coerce.number().nullable(),
      })
    ),
    purchase_parts: z.array(
      z.object({
        part_id: z.coerce.number().nullable(),
        inventory_id: z.coerce.number().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string().nullable(),
        barcode: z.string().nullable(),
        brand_name: z.string().nullable(),
        quantity: z.coerce.number().nullable(),
        price: z.coerce.number().nullable(),
      })
    ),
    purchase_services: z.array(
      z.object({
        id: z.coerce.number().nullable(),
        inventory_id: z.coerce.number().nullable(),
        name: z.string().nullable(),
        description: z.string().nullable(),
        image: z.string().nullable(),
        duration: z.coerce.number().nullable(),
        price: z.coerce.number().nullable(),
      })
    ),
    mechanic_entries: z
      .array(z.string().min(1))
      .min(1)
      .nonempty("Please select at least one mechanic."),
    progress_entries: z.array(
      z.object({
        progress_name: z.string(),
        description: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof orderServiceSchema>>({
    resolver: zodResolver(orderServiceSchema),
    defaultValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_contact_number: 0,
      employee_id: currentUser.id,
      payment_method: "",
      amount_paid: 0,
      status: "Pending",
      mobile_user_id: "",
      subtotal: 0,
      total_price: 0,
      discount: "0",
      tax: 0,
      // inventory_id:0 currentUser.branches.id.toString(),
      progress_entries: [
        {
          progress_name: "Created",
          description:
            "The repair request is created and logged into the system.",
        },
      ],
    },
  });

  form.setValue("purchase_products", orderCart.productsCart);
  form.setValue("purchase_parts", orderCart.partsCart);
  form.setValue("purchase_services", orderServiceCart.servicesCart);
  form.setValue(
    "subtotal",
    (
      orderCart.productsCart.reduce(
        (acc: any, product: any) => acc + product.price * product.quantity,
        0
      ) +
      orderCart.partsCart.reduce(
        (acc: any, part: any) => acc + part.price * part.quantity,
        0
      ) +
      orderServiceCart.servicesCart.reduce(
        (acc: any, service: any) => acc + service.price,
        0
      )
    ).toFixed(2)
  );
  form.setValue(
    "total_price",
    Number(
      (
        (orderCart.productsCart.reduce(
          (acc: any, product: any) =>
            acc +
            (isNaN(product.price) || isNaN(product.quantity)
              ? 0
              : product.price * product.quantity),
          0
        ) +
          orderCart.partsCart.reduce(
            (acc: any, part: any) =>
              acc +
              (isNaN(part.price) || isNaN(part.quantity)
                ? 0
                : part.price * part.quantity),
            0
          ) +
          orderServiceCart.servicesCart.reduce(
            (acc: any, service: any) =>
              acc + (isNaN(service.price) ? 0 : service.price),
            0
          )) *
        ((100 -
          (isNaN(form.getValues("discount"))
            ? 0
            : Number(form.getValues("discount")))) /
          100)
      ).toFixed(2)
    )
  );
  const discountData = form.getValues("discount");
  const status = form.getValues("status");
  const mobileUser = form.getValues("mobile_user_id");

  useEffect(() => {
    setMinTotalPrice(
      Number(
        (
          (orderCart.productsCart.reduce(
            (acc: any, product: any) => acc + product.price * product.quantity,
            0
          ) +
            orderCart.partsCart.reduce(
              (acc: any, part: any) => acc + part.price * part.quantity,
              0
            ) +
            orderServiceCart.servicesCart.reduce(
              (acc: any, service: any) => acc + service.price,
              0
            )) *
          ((100 - Number(form.getValues("discount"))) / 100)
        ).toFixed(2)
      )
    );
    if (status === "Pending") {
      setMin(0);
      form.setValue("amount_paid", 0);
    } else {
      setMin(minTotalPrice);
    }
    // console.log(form.getValues("purchase_services"));
    if (form.formState.errors) {
      console.log(form.formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderCart.productsCart,
    orderCart.partsCart,
    orderServiceCart.servicesCart,
    discountData,
    minTotalPrice,
    status,
    mobileUser,
    mobileUserData,
    allMobileUsers,
  ]);
  useEffect(() => {
    setMobileUserData(
      allMobileUsers.find((user: any) => user.id === mobileUser)
    );
    if (mobileUserData) {
      form.setValue("customer_first_name", mobileUserData?.first_name);
      form.setValue("customer_last_name", mobileUserData?.last_name);
      form.setValue("customer_email", mobileUserData?.email);
      form.setValue("customer_contact_number", mobileUserData?.contact_number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMobileUsers, mobileUser]);

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createOrderService(data, 500);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }

      setDialogOpen(false);
      sonner("✨Success", {
        description: `Service Order Successful!`,
        action: {
          label: "Print",
          onClick: () =>
            router.push(
              `/application/transactions/order_service/${result.data[0].id}`
            ),
        },
      });
      // toast({
      //   title: "You submitted the following values:",
      //   description: (
      //     <pre className="mt-2 w-[1340px] h-[600px] rounded-md bg-slate-950 p-4 overflow-y-scroll">
      //       <code className="text-black">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // });
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        dispatch(resetOrderCart());
        dispatch(resetOrderServiceCart());
      });
    });
  }

  function onCancel() {
    dispatch(resetOrderCart());
    dispatch(resetOrderServiceCart());
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-white"
      >
        <div className="w-full flex justify-between gap-4">
          <div className="w-[60%] 2xl:w-[50%] h-full rounded-lg overflow-hidden">
            <OrderCartOptions />
          </div>
          <ScrollArea className="w-full h-[553px] 2xl:h-[657px] flex flex-col justify-between bg-darkBg rounded-lg border border-lightBorder p-0 px-4 gap-0 relative">
            <div className="w-full h-full flex flex-col gap-6 justify-between relative">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                defaultValue={[
                  "item-1",
                  "item-2",
                  "item-3",
                  "item-4",
                  "item-5",
                ]}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Basic Information
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <div className="w-full flex flex-col gap-4 px-2">
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={field.value || ""}
                                    disabled={
                                      form.getValues("mobile_user_id")
                                        ? true
                                        : false
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={field.value || ""}
                                    disabled={
                                      form.getValues("mobile_user_id")
                                        ? true
                                        : false
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_contact_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Contact Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...field}
                                    accept="number"
                                    type="number"
                                    placeholder="#"
                                    value={field.value || ""}
                                    disabled={
                                      form.getValues("mobile_user_id")
                                        ? true
                                        : false
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="mobile_user_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Mobile User
                                </FormLabel>
                                <MobileUserInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Payment
                                </FormLabel>
                                <PaymentInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col ">
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Status
                                </FormLabel>
                                <StatusInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="inventory_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Branch
                                </FormLabel>
                                <BranchInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="supervisor_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Supervisor
                                </FormLabel>
                                <SupervisorInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="mechanic_entries"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-xs">
                                Mechanics
                              </FormLabel>
                              <FormControl>
                                <MultiSelectFormField
                                  options={allMechanics}
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                  placeholder="Select Mechanics"
                                  animation={2}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="example@gmail.com"
                                    value={field.value || ""}
                                    disabled={
                                      form.getValues("mobile_user_id")
                                        ? true
                                        : false
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="amount_paid"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Amount Paid
                                </FormLabel>
                                <div className="w-full flex place-items-center rounded-lg bg-lightComponentBg ">
                                  <div className="h-full px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
                                    <TbCurrencyPeso className="h-full w-5 text-center" />
                                  </div>
                                  <FormControl>
                                    <Input
                                      className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                      {...field}
                                      type="number"
                                      placeholder="Amount"
                                      value={field.value || ""}
                                      disabled={
                                        form.getValues("status") === "Paid"
                                          ? false
                                          : true
                                      }
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col ">
                          <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Discount
                                </FormLabel>
                                <DiscountInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Vehicle Information
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <div className="w-full flex flex-col gap-4 px-2">
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.car_brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Brand</FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Toyota"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.car_model"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Model</FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Vios"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.vehicle_type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Vehicle Type
                                </FormLabel>
                                <FormControl>
                                  <VehicleTypeInput data={field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.plate_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Plate Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="ABC 1234"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.color"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Color</FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Black"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.engine_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Engine Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="123456789"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.odo_reading"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Odometer Reading
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="number"
                                    placeholder="123456"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="vehicle_entry.chassis_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Chassis Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="123456789"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <FormField
                            control={form.control}
                            name="remarks"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Remarks
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Remarks"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {orderCart.productsCart.length > 0 && (
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                      Products Summary
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <ProductsCart
                        columns={initiateProductsCartColumns(
                          dispatch,
                          orderCartOptions.productsData
                        )}
                        data={orderCart.productsCart}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
                {orderCart.partsCart.length > 0 && (
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                      Parts Summary
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <PartsCart
                        columns={initiatePartsCartColumns(
                          dispatch,
                          orderCartOptions.partsData
                        )}
                        data={orderCart.partsCart}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
                {orderServiceCart.servicesCart.length > 0 && (
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                      Services Summary
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <ServicesCart
                        columns={initiateServicesCartColumns(dispatch)}
                        data={orderServiceCart.servicesCart}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
              <div className="w-full flex-col relative">
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">
                    Subtotal
                  </span>
                  <span className="w-[20%] text-end">{`₱ ${(
                    orderCart.productsCart.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                    orderCart.partsCart.reduce(
                      (acc: any, part: any) => acc + part.price * part.quantity,
                      0
                    ) +
                    orderServiceCart.servicesCart.reduce(
                      (acc: any, service: any) => acc + service.price,
                      0
                    )
                  )
                    .toFixed(
                      // sum all the products and parts
                      2
                    )
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                </div>

                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">Tax</span>
                  <span className="w-[20%] text-end">₱ 0.00</span>
                </div>
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">VAT</span>
                  <span className="w-[20%] text-end">₱ 0.00</span>
                </div>
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">
                    Discount{" "}
                    {Number(form.watch("discount")) > 0 &&
                      `(${form.getValues("discount")}%)`}
                  </span>
                  <span className="w-[20%] text-end">
                    {`- ₱ ${(
                      (orderCart.productsCart.reduce(
                        (acc: any, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      ) +
                        orderCart.partsCart.reduce(
                          (acc: any, part: any) =>
                            acc + part.price * part.quantity,
                          0
                        ) +
                        orderServiceCart.servicesCart.reduce(
                          (acc: any, service: any) => acc + service.price,
                          0
                        )) *
                      (Number(form.getValues("discount")) / 100)
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </span>
                </div>
                <div className="w-full py-6 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-lg font-bold">
                  <span className="w-full text-end">Total</span>
                  <span className="w-[20%] text-end">{`₱ ${(
                    (orderCart.productsCart.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                      orderCart.partsCart.reduce(
                        (acc: any, part: any) =>
                          acc + part.price * part.quantity,
                        0
                      ) +
                      orderServiceCart.servicesCart.reduce(
                        (acc: any, service: any) => acc + service.price,
                        0
                      )) *
                    ((100 - Number(form.getValues("discount"))) / 100)
                  )
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 text-red-500 bg-transparent hover:bg-transparent"
            type="button"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
            disabled={orderServiceCart.servicesCart.length === 0 ? true : false}
          >
            <span className={cn({ hidden: isPending })}>Create Order</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
