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
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useMainStocks } from "@/hooks/useMainStocks";

export default function DeleteEquipmentDialog({ equipmentData }: any) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const equipment = equipmentData;
  const { deleteEquipment } = useMainStocks();

  async function onSubmit(dataProps?: any) {
    startTransition(async () => {
      await deleteEquipment(dataProps, 4000);
      // const { error } = JSON.parse(result);
      // if (error?.message) {
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: error.message,
      //   });
      //   console.log(error);
      //   return;
      // }

      toast({
        description: (
          <pre className="mt-2 min-w-[340px] max-width-[840px] rounded-md border border-lightBorder bg-slate-950 p-4">
            <code className="text-white">Successfuly! Deleted</code>
            {/* <code className="text-white">
              {JSON.stringify(result, null, 2)}
            </code> */}
          </pre>
        ),
      });
      setDialogIsOpen(false);
      redirect("/application/requests");
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-lg flex gap-2 bg-transparent hover:bg-transparent text-red-600 hover:text-red-300">
          <RiDeleteBinLine />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Delete Part</DialogTitle>
          <DialogDescription>
            This operation is destructive. You wont be able to revert this
            action. Are you sure you want to delete this part?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-4 justify-center place-items-center">
          <span
            className="text-xs font-bold text-muted-foreground cursor-pointer hover:underline transition-all duration-300"
            onClick={() => setDialogIsOpen(false)}
          >
            Cancel
          </span>

          <Button
            variant="destructive"
            className="text-xs font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300"
            onClick={() => onSubmit(equipment)}
          >
            <span
              className={cn("flex gap-2 place-items-center justify-center", {
                hidden: isPending,
              })}
            >
              <RiDeleteBinLine />
              Delete
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
