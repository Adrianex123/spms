"use client";

import { useState, useTransition } from "react";
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
import { RiDeleteBinLine } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { updateServicePriceFromCart } from "@/redux/slices/orderServiceCartSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { TbCurrencyPeso } from "react-icons/tb";

export default function PriceDialog({ props }: any) {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [price, setPrice] = useState(props.price);

  async function onSubmit(dataProps?: any) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        dispatch(
          updateServicePriceFromCart({ id: dataProps.id, price: price })
        );
      });

      toast("✨Success", {
        description: `Service Price Update`,
      });
      setDialogIsOpen(false);
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold flex gap-2 bg-darkBg rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none">
          <MdModeEditOutline />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Change Price</DialogTitle>
          <DialogDescription>
            Change the service price depending on the service type.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex place-items-center rounded-lg bg-lightComponentBg ">
          <div className="h-full px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
            <TbCurrencyPeso className="h-full w-5 text-center" />
          </div>
          <Input
            className="rounded-lg bg-lightComponentBg border-slate-600/50"
            type="number"
            placeholder="Amount"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
        </div>

        <DialogFooter className="flex gap-4 justify-center place-items-center">
          <span
            className="text-xs font-bold text-muted-foreground cursor-pointer hover:underline transition-all duration-300"
            onClick={() => setDialogIsOpen(false)}
          >
            Cancel
          </span>

          <Button
            className="text-xs font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300"
            onClick={() => onSubmit(props)}
          >
            <span
              className={cn("flex gap-2 place-items-center justify-center", {
                hidden: isPending,
              })}
            >
              Submit
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
