"use client";

import { useState, useTransition } from "react";
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
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrNext } from "react-icons/gr";

export default function UpdateOrderStatusDialog() {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300"
          onClick={() => setDialogIsOpen(true)}
        >
          <span className="flex justify-center place-items-center gap-2">
            Update <GrNext />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Next Progress</DialogTitle>
          <DialogDescription>
            Are you sure you want to update the status of this order?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 justify-center place-items-center">
          <span
            className="text-xs font-bold text-muted-foreground cursor-pointer hover:underline transition-all duration-300"
            onClick={() => setDialogIsOpen(false)}
          >
            Cancel
          </span>

          <Button className="text-xs bg-applicationPrimary font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300 hover:bg-applicationPrimary/70">
            <span
              className={cn("flex gap-2 place-items-center justify-center", {
                hidden: isPending,
              })}
            >
              Update
            </span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
