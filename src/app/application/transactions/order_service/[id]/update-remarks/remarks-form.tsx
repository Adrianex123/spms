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
import { Textarea } from "@/components/ui/textarea";

export default function RemarksForm({ props, setDialogIsOpen }: any) {
  const { updateOrderServiceRemarks } = useOrderServices();
  const [isPending, startTransition] = useTransition();

  const currentOrderService = useSelector(
    (state: any) => state.currentOrderService.currentOrderService
  );

  const updateRemarksForm = z.object({
    id: z.string().nullable(),
    remarks: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof updateRemarksForm>>({
    resolver: zodResolver(updateRemarksForm),
    defaultValues: {
      id: currentOrderService.id,
      remarks: currentOrderService.remarks,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      await updateOrderServiceRemarks(data);

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
          name="remarks"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Notes about this vehicle..."
                  className="resize-none bg-lightBorder border border-lightBorder text-sm text-black rounded-lg p-2 w-full h-32"
                  {...field}
                  value={field.value || ""}
                />
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
