"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import UpdateOrderStatusForm from "./update-order-status-form";

export default function UpdateOrderStatusDialog({ orderData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "text-xs rounded-full py-0.5 px-2 border font-normal flex place-items-center gap-1 cursor-pointer",
            orderData.status === "Paid"
              ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500 px-4"
              : orderData.status === "Pending"
              ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
              : "text-slate-600 bg-slate-600 bg-opacity-20 border-slate-600"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              orderData.status === "Paid"
                ? " bg-green-500 "
                : orderData.status === "Pending"
                ? "bg-yellow-300 "
                : "bg-slate-600"
            )}
          ></div>
          {orderData.status}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update order status</DialogTitle>
          <DialogDescription>
            Update order status. Status can be Paid or Pending
          </DialogDescription>
        </DialogHeader>
        <UpdateOrderStatusForm
          setDialogIsOpen={setDialogIsOpen}
          order={orderData}
        />
      </DialogContent>
    </Dialog>
  );
}
