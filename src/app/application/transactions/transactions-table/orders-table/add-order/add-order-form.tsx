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

import { initiateColumns as initiateProductsCartColumns } from "./add-order-cart/products-cart/columns";
import { initiateColumns as initiatePartsCartColumns } from "./add-order-cart/parts-cart/columns";

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
import { useOrders } from "@/hooks/useOrders";
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

export default function OrderForm({ setDialogOpen }: any) {
  const currentUser = useSelector((state: any) => state.currentSession);
  const [isPending, startTransition] = useTransition();
  const { createOrder } = useOrders();
  const dispatch = useDispatch();
  const router = useRouter();

  const orderCart = useSelector((state: any) => state.orderCart);
  const orderCartOptions = useSelector(
    (state: any) => state.orderCartOptionSlice
  );

  const [minTotalPrice, setMinTotalPrice] = useState(0);

  const orderSchema: any = z.object({
    customer_first_name: z.string().nullable(),
    customer_last_name: z.string().nullable(),
    customer_email: z.string().nullable(),
    customer_contact_number: z.coerce.number().nullable(),
    status: z.string(),
    payment_method: z
      .string()
      .min(1, { message: "Payment method is required" }),
    inventory_id: z
      .string()
      .min(1, { message: "Branch is required" })
      .transform((arg) => new Number(arg)),
    employee_id: z.string(),
    discount: z.string().transform((arg) => new Number(arg)),
    tax: z.coerce.number(),
    subtotal: z.coerce.number(),
    total_price: z.coerce.number(),
    amount_paid: z.coerce.number().min(minTotalPrice, {
      message: "Amount paid should be equal or greater than total price",
    }),

    purchase_products: z.array(
      z.object({
        product_id: z.coerce.number(),
        inventory_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        barcode: z.string(),
        uom_name: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
      })
    ),
    purchase_parts: z.array(
      z.object({
        part_id: z.coerce.number(),
        inventory_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        barcode: z.string(),
        brand_name: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
      })
    ),
  });
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_contact_number: 0,
      employee_id: currentUser.id,
      payment_method: "",
      subtotal: 0,
      total_price: 0,
      discount: "0",
      tax: 0,
      inventory_id: currentUser.branches.id.toString(),
    },
  });

  form.setValue("purchase_products", orderCart.productsCart);
  form.setValue("purchase_parts", orderCart.partsCart);
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
      )
    ).toFixed(2)
  );
  form.setValue(
    "total_price",
    Number(
      (
        (orderCart.productsCart.reduce(
          (acc: any, product: any) => acc + product.price * product.quantity,
          0
        ) +
          orderCart.partsCart.reduce(
            (acc: any, part: any) => acc + part.price * part.quantity,
            0
          )) *
        ((100 - Number(form.getValues("discount"))) / 100)
      )
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    )
  );

  const discountData = form.getValues("discount");

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
            )) *
          ((100 - Number(form.getValues("discount"))) / 100)
        ).toFixed(2)
      )
    );
  }, [
    orderCart.productsCart,
    orderCart.partsCart,
    discountData,
    minTotalPrice,
    form,
  ]);

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createOrder(data, 500);

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
        description: `Order Successful!`,
        action: {
          label: "Print",
          onClick: () =>
            router.push(`/application/transactions/order/${result.data[0].id}`),
        },
      });
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        dispatch(resetOrderCart());
      });
    });
  }

  function onCancel() {
    dispatch(resetOrderCart());
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
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
                defaultValue={["item-1", "item-2", "item-3"]}
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
                {orderCart.productsCart.length > 0 && (
                  <AccordionItem value="item-2">
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
                  <AccordionItem value="item-3">
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
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
            disabled={
              orderCart.partsCart.length === 0 &&
              orderCart.productsCart.length === 0
                ? true
                : false
            }
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
