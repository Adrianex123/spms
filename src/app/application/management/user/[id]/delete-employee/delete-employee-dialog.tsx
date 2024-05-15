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

import { useDispatch } from "react-redux";
import { setEmployeeData } from "@/redux/slices/employeeSlice";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useEmployees } from "@/hooks/useEmployees";

export default function DeleteEmployeeDialog({ employeeData }: any) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const employee = employeeData;
  const dispatch = useDispatch();
  dispatch(setEmployeeData(employee));
  const { deleteEmployee } = useEmployees();

  async function onSubmit(dataProps?: any) {
    startTransition(async () => {
      const result = await deleteEmployee(dataProps, 4000);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        console.log(error);
        return;
      }

      toast({
        description: (
          <pre className="mt-2 min-w-[340px] max-width-[840px] rounded-md border border-lightBorder bg-slate-950 p-4">
            <code className="text-black">Successfuly! Deleted</code>
          </pre>
        ),
      });
      setDialogIsOpen(false);
      redirect("/application/management");
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
      <DialogContent className="sm:max-w-[400px]  Bg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This operation is destructive. You wont be able to revert this
            action. Are you sure you want to delete this user?
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
            onClick={() => onSubmit(employee)}
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
