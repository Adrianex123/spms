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

import UpdateStockForm from "./update-stock-form";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UpdateStockDialog({ stock, uoms }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-lg flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]  Bg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the Stock
          </DialogDescription>
        </DialogHeader>
        <UpdateStockForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
          stock={stock}
          uoms={uoms}
        />
      </DialogContent>
    </Dialog>
  );
}
