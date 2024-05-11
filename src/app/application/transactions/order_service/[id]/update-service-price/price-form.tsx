"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { TbCurrencyPeso } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useOrderServices } from "@/hooks/useOrderServices";

export default function PriceForm({ props, setDialogIsOpen }: any) {
  const { updateOrderServicePrice } = useOrderServices();
  const [isPending, startTransition] = useTransition();

  const currentOrderService = useSelector(
    (state: any) => state.currentOrderService.currentOrderService
  );

  const updatePriceForm = z.object({
    id: z.string().nullable(),
    service_id: z.coerce.number(),
    price: z.coerce.number(),
    subtotal: z.coerce.number(),
    total_price: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof updatePriceForm>>({
    resolver: zodResolver(updatePriceForm),
    defaultValues: {
      id: currentOrderService.id,
      service_id: props.id,
      price: props.price,
      subtotal: currentOrderService.subtotal,
      total_price: currentOrderService.total_price,
    },
  });

  form.setValue(
    "subtotal",
    currentOrderService.purchase_products.reduce(
      (acc: any, product: any) => acc + product.price * product.quantity,
      0
    ) +
      currentOrderService.purchase_parts.reduce(
        (acc: any, part: any) => acc + part.price * part.quantity,
        0
      ) +
      currentOrderService.purchase_services
        .filter((service: any) => service.id !== props.id)
        .reduce((acc: any, service: any) => acc + service.price, 0)
  );

  async function onSubmit(data: any) {
    startTransition(async () => {
      const subTotal = data.price + data.subtotal;
      //   total price with discount
      const totalPrice =
        subTotal - subTotal * (currentOrderService.discount / 100);
      await updateOrderServicePrice(
        {
          id: data.id,
          service_id: data.service_id,
          price: data.price,
          subtotal: subTotal,
          total_price: totalPrice,
        },
        1000
      );

      setDialogIsOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex place-items-center rounded-lg bg-darkBg border-slate-600/50">
          <div className="h-full flex flex-col px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
            <TbCurrencyPeso className="h-full w-5 text-center" />
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="w-full bg-lightComponentBg border-transparent rounded-bl-none rounded-tl-none"
                    {...field}
                    type="number"
                    placeholder="0.00"
                    value={field.value || 0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 text-red-500 bg-transparent hover:bg-transparent"
            type="button"
            onClick={() => setDialogIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Submit</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
