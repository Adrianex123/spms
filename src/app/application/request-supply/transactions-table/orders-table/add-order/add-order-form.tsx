import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";

import { DataTable as FoodSuppliesCart } from "./add-order-cart/products-cart/data-table";
import { DataTable as StocksCart } from "./add-order-cart/parts-cart/data-table";
import { DataTable as VehiclesCart } from "./add-order-cart/vehicles-cart/data-table";

import { initiateColumns as initiateFoodSupplyCartColumns } from "./add-order-cart/products-cart/columns";
import { initiateColumns as initiateStocksCartColumns } from "./add-order-cart/parts-cart/columns";
import { initiateColumns as initiateVehiclesCartColumns } from "./add-order-cart/vehicles-cart/columns";

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
import { useRequests } from "@/hooks/useOrders";
import { useSelector } from "react-redux";
import RequestCartOptions from "./add-order-table/lists";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/slices/orderCartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import StatusInput from "./status-input";

export default function RequestForm({ setDialogOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const { createRequest } = useRequests();
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state: any) => state.currentSession);
  const requestCart = useSelector((state: any) => state.requestCart);
  const requestCartOptions = useSelector(
    (state: any) => state.requestCartOptionSlice
  );

  const [minTotalPrice, setMinTotalPrice] = useState(0);

  const RequestSchema: any = z.object({
    // requester_first_name: z.string().nullable(),
    // requester_last_name: z.string().nullable(),
    // requester_email: z.string().nullable(),
    // requester_contact_number: z.coerce.number().nullable(),
    // employee_id: z.string(),
    // calamity_type: z.string(),

    use_stocks: z.array(
      w({
        stocks: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        quantity: z.coerce.number(),
      })
    ),
    // use_stocks: z.array(
    //   z.object({
    //     stocks: z.coerce.number(),
    //     name: z.string(),
    //     description: z.string(),
    //     image: z.string(),
    //     quantity: z.coerce.number(),
    //   })
    // ),
    use_vehicles: z.array(
      z.object({
        vehicles_id: z.coerce.number(),
        inventory_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        quantity: z.coerce.number(),
      })
    ),
  });
  const form = useForm<z.infer<typeof RequestSchema>>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      requester_first_name: "",
      requester_last_name: "",
      requester_email: "",
      requester_contact_number: 0,
      employee_id: "",
      payment_method: "",
      subtotal: 0,
      total_price: 0,
    },
  });

  useEffect(
    () => {
      // if form has error then console.log
      console.log(form.formState.errors);
      console.log(requestCart);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.formState.errors, requestCart]
  );

  // form.setValue("use_stocks", requestCart.stocksCart);
  form.setValue("use_stocks", requestCart.foodsuppliesCart);
  form.setValue("use_vehicles", requestCart.vehiclesCart);
  // form.setValue(
  //   "subtotal",
  //   (
  //     requestCart.stocksCart.reduce(
  //       (acc: any, equipment: any) =>
  //         acc + equipment.price * equipment.quantity,
  //       0
  //     ) +
  //     requestCart.foodsuppliesCart.reduce(
  //       (acc: any, foodsupply: any) =>
  //         acc + foodsupply.price * foodsupply.quantity,
  //       0
  //     ) +
  //     requestCart.vehiclesCart.reduce(
  //       (acc: any, vehicle: any) => acc + vehicle.price * vehicle.quantity,
  //       0
  //     )
  //   ).toFixed(3)
  // );
  // form.setValue(
  //   "total_price",
  //   Number(
  //     (
  //       requestCart.stocksCart.reduce(
  //         (acc: any, equipment: any) =>
  //           acc + equipment.price * equipment.quantity,
  //         0
  //       ) +
  //       (
  //         requestCart.foodsuppliesCart.reduce(
  //           (acc: any, foodsupply: any) =>
  //             acc + foodsupply.price * foodsupply.quantity,
  //           0
  //         ) +
  //         requestCart.vehiclesCart.reduce(
  //           (acc: any, vehicle: any) => acc + vehicle.price * vehicle.quantity,
  //           0
  //         )
  //       )()
  //     )
  //       .toFixed(3)
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //   )
  // );

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createRequest(data, 500);

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
        description: `Request Successful!`,
      });
      console.log(data);
      alert("Request Successful!");
      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        dispatch(resetCart());
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-4">
          <div className="w-[60%] 2xl:w-[50%] h-full rounded-lg overflow-hidden">
            <RequestCartOptions />
          </div>
          <ScrollArea className="w-full h-[553px] 2xl:h-[657px] flex flex-col justify-between bg-darkBg rounded-lg border border-lightBorder p-0 px-4 gap-0 relative">
            <div className="w-full h-full flex flex-col gap-6 justify-between relative">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                defaultValue={["item-1", "item-2", "item-3", "item-4"]}
              >
                {/* <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Equipments Summary
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <StocksCart
                      columns={initiateStocksCartColumns(
                        dispatch,
                        requestCartOptions.equipmentsData
                      )}
                      data={requestCart.stocksCart}
                    />
                  </AccordionContent>
                </AccordionItem> */}
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Food Supply Summary
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <FoodSuppliesCart
                      columns={
                        requestCartOptions &&
                        requestCartOptions.foodsuppliesData
                          ? initiateFoodSupplyCartColumns(
                              dispatch,
                              requestCartOptions.foodsuppliesData
                            )
                          : []
                      }
                      data={requestCart.foodsuppliesCart}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="w-full flex-col relative">
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  {/* <span className="w-full text-end text-slate-400">
                    Subtotal
                  </span>
                  <span className="w-[20%] text-end">{`₱ ${(
                    requestCart.foodsuppliesCart.reduce(
                      (acc: any, foodsupply: any) =>
                        acc + foodsupply.price * foodsupply.quantity,
                      0
                    ) +
                    requestCart.vehiclesCart.reduce(
                      (acc: any, vehicle: any) =>
                        acc + vehicle.price * vehicle.quantity,
                      0
                    ) +
                    requestCart.stocksCart.reduce(
                      (acc: any, equipment: any) =>
                        acc + equipment.price * equipment.quantity,
                      0
                    )
                  )
                    .toFixed(
                      // sum all the food_supplies and equipments
                      3
                    )
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span> */}
                </div>

                {/* <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
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
                      requestCart.foodsuppliesCart.reduce(
                        (acc: any, foodsupply: any) =>
                          acc + foodsupply.price * foodsupply.quantity,
                        0
                      ) +
                      (requestCart.vehiclesCart.reduce(
                        (acc: any, vehicle: any) =>
                          acc + vehicle.price * vehicle.quantity,
                        0
                      ) +
                        requestCart.stocksCart.reduce(
                          (acc: any, equipment: any) =>
                            acc + equipment.price * equipment.quantity,
                          0
                        )) *
                        (Number(form.getValues("discount")) / 100)
                    )
                      .toFixed(3)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </span>
                </div> */}
                <div className="w-full py-6 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-lg font-bold">
                  <span className="w-full text-end">Total</span>
                  <span className="w-[20%] text-end">
                    {(
                      requestCart.foodsuppliesCart.reduce(
                        (acc: any, foodsupply: any) =>
                          acc + foodsupply.quantity,
                        0
                      ) +
                      requestCart.vehiclesCart.reduce(
                        (acc: any, vehicle: any) => acc + vehicle.quantity,
                        0
                      ) +
                      requestCart.stocksCart.reduce(
                        (acc: any, equipment: any) => acc + equipment.quantity,
                        0
                      )
                    )
                      .toFixed(
                        // sum all the food_supplies and equipments
                        3
                      )
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/80
            data-[state=active]:text-whitepx-4 py-2 text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 transition-all duration-300"
            type="submit"
            disabled={
              requestCart.vehiclesCart.length === 0 &&
              requestCart.stocksCart.length === 0 &&
              requestCart.foodsuppliesCart.length === 0
                ? true
                : false
            }
          >
            <span className={cn({ hidden: isPending })}>Submit Request</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
