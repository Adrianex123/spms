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

import OrderForm from "./add-order-form";
import { BsBoxSeam } from "react-icons/bs";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

export default function OrderDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <VscGitPullRequestGoToChanges size="1.5em" />
          Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1170px] 2xl:max-w-[1570px] bg-white vbg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle className="bg-white">New Request</DialogTitle>
          <DialogDescription>Request Products Here....</DialogDescription>
        </DialogHeader>
        <OrderForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
