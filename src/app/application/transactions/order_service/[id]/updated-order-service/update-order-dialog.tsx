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

import OrderForm from "./update-order-form";
import { BsBoxSeam } from "react-icons/bs";

export default function UpdateOrderDialog({ data }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <BsBoxSeam /> Add Purchases
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1170px] 2xl:max-w-[1570px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Purchases Order</DialogTitle>
          <DialogDescription>
            Update new more purchases to the order.
          </DialogDescription>
        </DialogHeader>
        <OrderForm setDialogOpen={setDialogIsOpen} data={data} />
      </DialogContent>
    </Dialog>
  );
}
