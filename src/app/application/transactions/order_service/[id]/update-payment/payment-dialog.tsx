"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlinePayments } from "react-icons/md";

import PaymentForm from "./payment-form";

export default function PaymentDialog({ props }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <MdOutlinePayments /> Update Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Payment</DialogTitle>
          <DialogDescription>
            Update the payment details for this order.
          </DialogDescription>
        </DialogHeader>
        <PaymentForm props={props} setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
