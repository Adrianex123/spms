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

import { MdModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import PriceForm from "./price-form";

export default function PriceDialog({ props }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const progressEntries = useSelector(
    (state: any) => state.progressEntries.progress_entries
  );

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        {progressEntries.length !== 5 && (
          <Button className="text-xs font-bold flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary/80 rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none">
            <MdModeEditOutline />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Change Price</DialogTitle>
          <DialogDescription>
            Change the service price depending on the service type.
          </DialogDescription>
        </DialogHeader>
        <PriceForm props={props} setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
