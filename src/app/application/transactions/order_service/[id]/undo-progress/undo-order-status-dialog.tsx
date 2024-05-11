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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useProgressEntries } from "@/hooks/useProgressEntries";

type progressEntriesType =
  | {
      id: number | any;
      created_at: string | any;
      progress_name: string | any;
      description: string | any;
      order_service_id: string | any;
    }[]
  | any;

export default function UndoOrderStatusDialog({
  progress_entries,
}: progressEntriesType) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { undoProgress } = useProgressEntries();

  const undoProgressSchema = z.object({
    progress_id: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof undoProgressSchema>>({
    resolver: zodResolver(undoProgressSchema),
    defaultValues: {
      progress_id: progress_entries[0].id,
    },
  });
  form.setValue("progress_id", progress_entries[0].id);

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await undoProgress(data, 500);
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: error.message,
        });
        return;
      }
      form.setValue("progress_id", progress_entries[0].id);

      sonner("✨ Success", {
        description: `If no changes are reflected, please refresh the page.`,
      });
      setDialogIsOpen(false);
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <span
          className="flex justify-center place-items-center gap-2 text-white text-xs font-bold cursor-pointer"
          onClick={() => setDialogIsOpen(true)}
        >
          Undo
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>⚠️ This is a destructive action</DialogTitle>
          <DialogDescription>
            Are you sure you want to undo the current status of this order?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              >
                <span
                  className={cn(
                    "flex gap-2 place-items-center justify-center",
                    {
                      hidden: isPending,
                    }
                  )}
                >
                  Undo
                </span>
                <AiOutlineLoading3Quarters
                  className={cn(" animate-spin", { hidden: !isPending })}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
