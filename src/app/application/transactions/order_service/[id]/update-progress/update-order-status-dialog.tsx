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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useProgressEntries } from "@/hooks/useProgressEntries";

export default function UpdateOrderStatusDialog({ progress_entries }: any) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { addProgress } = useProgressEntries();

  const updateProgressSchema = z.object({
    progress_name: z.string(),
    progress_description: z.string(),
    order_service_id: z.string(),
  });

  const progressCollection = {
    created: {
      progress_name: "Created",
      description: "The service request is created and logged into the system.",
    },
    in_progress: {
      progress_name: "In Progress",
      description: "The services are currently being worked on by mechanics.",
    },
    quality_checks: {
      progress_name: "Quality Checks",
      description:
        "A thorough quality check is performed to ensure the services meets standards.",
    },
    ready_for_pickup: {
      progress_name: "Ready for Pick-up",
      description:
        "The services has been successfully completed and the vehicle is ready to be for Pick-up.",
    },
    completed: {
      progress_name: "Completed",
      description:
        "The services has been successfully completed and the vehicle is returned to the customer.",
    },
  };

  const form = useForm<z.infer<typeof updateProgressSchema>>({
    resolver: zodResolver(updateProgressSchema),
    defaultValues: {
      progress_name:
        progress_entries.length === 1
          ? progressCollection.in_progress.progress_name
          : progress_entries.length === 2
          ? progressCollection.quality_checks.progress_name
          : progress_entries.length === 3
          ? progressCollection.ready_for_pickup.progress_name
          : progress_entries.length === 4
          ? progressCollection.completed.progress_name
          : "",

      progress_description:
        progress_entries.length === 1
          ? progressCollection.in_progress.description
          : progress_entries.length === 2
          ? progressCollection.quality_checks.description
          : progress_entries.length === 3
          ? progressCollection.ready_for_pickup.description
          : progress_entries.length === 4
          ? progressCollection.completed.description
          : "",
      order_service_id: progress_entries[0]?.order_service_id,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await addProgress(data, 2000);
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: error.message,
        });
        return;
      }
      sonner("✨ Success", {
        description: `Progress updated!`,
      });
      setDialogIsOpen(false);
    });
  }

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
          <DialogTitle>
            Next Progress is{" "}
            {progress_entries.length === 1
              ? progressCollection.in_progress.progress_name
              : progress_entries.length === 2
              ? progressCollection.quality_checks.progress_name
              : progress_entries.length === 3
              ? progressCollection.ready_for_pickup.progress_name
              : progress_entries.length === 4
              ? progressCollection.completed.progress_name
              : ""}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to update the status of this order?
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

              <Button className="text-xs bg-applicationPrimary font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300 hover:bg-applicationPrimary/70">
                <span
                  className={cn(
                    "flex gap-2 place-items-center justify-center",
                    {
                      hidden: isPending,
                    }
                  )}
                >
                  Update
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
