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

import UpdateEquipmentForm from "./update-part-form";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UpdateEquipmentDialog({
  equipmentData,
  brandsData,
}: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-lg flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Equipment</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the part
          </DialogDescription>
        </DialogHeader>
        <UpdateEquipmentForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
          equipment={equipmentData}
          brands={brandsData}
        />
      </DialogContent>
    </Dialog>
  );
}
