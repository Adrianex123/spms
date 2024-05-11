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

import RemarksForm from "./remarks-form";

export default function PaymentDialog({ props }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          Remarks
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Remarks</DialogTitle>
          <DialogDescription>Remarks for the order service</DialogDescription>
        </DialogHeader>
        <RemarksForm props={props} setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
