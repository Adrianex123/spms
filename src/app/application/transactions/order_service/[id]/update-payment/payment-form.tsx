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
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useOrderServices } from "@/hooks/useOrderServices";
import PaymentInput from "./payment-input";

export default function PaymentForm({ props, setDialogIsOpen }: any) {
  const { updateOrderServicePayment } = useOrderServices();
  const [isPending, startTransition] = useTransition();

  const currentOrderService = useSelector(
    (state: any) => state.currentOrderService.currentOrderService
  );

  const updatePaymentForm = z.object({
    id: z.string().nullable(),
    amount_paid: z.coerce.number().min(currentOrderService.total_price, {
      message: `Amount paid should be equal or greater than ${currentOrderService.total_price
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    }),
    payment_method: z.string().min(1, {
      message: "Payment method is required",
    }),
  });

  const form = useForm<z.infer<typeof updatePaymentForm>>({
    resolver: zodResolver(updatePaymentForm),
    defaultValues: {
      id: currentOrderService.id,
      amount_paid: currentOrderService.amount_paid,
      payment_method: currentOrderService.payment_method,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      await updateOrderServicePayment(data);

      setDialogIsOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Payment</FormLabel>
              <PaymentInput data={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount_paid"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-xs">Amount Paid</FormLabel>
              <FormControl>
                <div className="w-full flex place-items-center rounded-lg bg-darkBg border-slate-600/50">
                  <div className="h-full flex flex-col px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
                    <TbCurrencyPeso className="h-full w-5 text-center" />
                  </div>
                  <Input
                    className="w-full bg-lightComponentBg border-transparent rounded-bl-none rounded-tl-none"
                    {...field}
                    type="number"
                    placeholder="0.00"
                    value={field.value}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
