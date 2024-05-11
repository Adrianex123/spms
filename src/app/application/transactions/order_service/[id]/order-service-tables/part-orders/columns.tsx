"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type cartItem = {
  part_id: number;
  name: string;
  description: string;
  image_url: string;
  quantity: number;
  price: number;
  barcode: string;
  brand: string;
  status: string;
  created_at: string;
  uoms: any;
  inventory: any;
};

export const initiateColumns = () => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Part",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between gap-4">
            <Avatar className="w-14 h-14 2xl:w-20 2xl:h-20 cursor-pointer z-0 rounded-md">
              <AvatarImage
                src={row.original.image_url}
                alt={row.original.image_url}
              />
              <AvatarFallback className="bg-lightBorder rounded-md">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-start 2xl:py-2">
              <p className="text-md max-w-[200px] 2xl:max-w-[200px] truncate text-slate-50 font-bold">
                {row.original.name}
              </p>{" "}
              <p className="text-sm max-w-[120px] 2xl:max-w-[140px] truncate text-slate-400">
                {`Barcode: ${row.original.barcode}`}
              </p>
              <p className="text-sm max-w-[180px] 2xl:max-w-[200px] truncate text-slate-400">
                {`BRAND: • ${row.original.brand}`}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "quantity",
      header: () => {
        return <div className="w-full text-center">Quantity</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-4 justify-center place-items-center">
            <p className="text-white font-regular">x {row.original.quantity}</p>
          </div>
        );
      },
    },
    {
      id: "price",
      header: () => {
        return <div className="w-full text-end">Price</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-4 justify-end place-items-center">
            <p className="text-sm max-w-[170px] 2xl:max-w-[180px] truncate text-white font-regular">
              {`₱ ${row.original.price
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </p>
          </div>
        );
      },
    },
  ];
  return columns;
};
