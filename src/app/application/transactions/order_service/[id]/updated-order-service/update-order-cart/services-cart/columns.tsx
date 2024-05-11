"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMinus } from "react-icons/fa";
import { removeServiceFromCart } from "@/redux/slices/orderServiceCartSlice";
import { Input } from "@/components/ui/input";
import PriceDialog from "./price-dialog";

type cartItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  duration: number;
  price: number;
  status: string;
  created_at: string;
  inventory: any;
};

export const initiateColumns = (dispatch: any) => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Service",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between gap-4">
            <Avatar className="w-14 h-14 2xl:w-20 2xl:h-20 cursor-pointer z-0 rounded-md">
              <AvatarImage src={row.original.image} alt={row.original.image} />
              <AvatarFallback className="bg-lightBorder rounded-md">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-between 2xl:py-2">
              <p className="text-xs max-w-[100px] 2xl:max-w-[200px] truncate font-semibold">
                {row.original.name}
              </p>
              <p className="text-xs text-white/50">
                Status:
                <span> {row.original.status}</span>
              </p>
              <p className="text-xs text-white/50">
                Duration:
                <span>{row.original.duration}</span>
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "action",
      header: () => {
        return <div className="w-full text-center">Action</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-4 justify-center place-items-center">
            <Button
              className="text-xs font-bold rounded-md flex gap-2 hover:text-white transition-all duration-300 px-4 py-2 cursor-pointer bg-transparent hover:bg-red-500 border border-lightBorder hover:border-transparent"
              type="button"
              onClick={() => {
                dispatch(removeServiceFromCart(row.original.id));
              }}
            >
              <FaMinus />
              Remove
            </Button>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return <div className="w-full text-right">Total</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex justify-end">
            <div className="w-[130px] flex place-items-center rounded-lg bg-lightComponentBg ">
              <div className="h-full bg-darkBg rounded-tl-lg rounded-bl-lg">
                <PriceDialog props={row.original} />
              </div>
              <Input
                className="rounded-lg bg-lightComponentBg border-slate-600/50"
                type="number"
                placeholder="Amount"
                readOnly
                value={row.original.price}
              />
            </div>
          </div>
        );
      },
    },
  ];
  return columns;
};
