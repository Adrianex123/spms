import { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DepartmentForm from "./add-department-form";

export default function EmployeesDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          New Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>New Department</DialogTitle>
          <DialogDescription>
            Add a new Department with Descriptions Charrr
          </DialogDescription>
        </DialogHeader>
        <DepartmentForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
