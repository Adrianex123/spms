"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PriceDialog from "../../update-service-price/price-dialog";

type cartItem = {
  service_id: number;
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  description: string;
  inventory_id: number;
  order_service_id: string;
};

export const initiateColumns = () => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Product",
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
              <p className="text-sm max-w-[320px] 2xl:max-w-[340px] truncate text-slate-400">
                {`Description: ${row.original.description}`}
              </p>
            </div>
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
          <div className="w-full flex justify-end">
            <div className="w-[130px] h-full flex place-items-center rounded-lg  bg-lightComponentBg">
              <div className="h-full bg-lightBorder rounded-tl-lg rounded-bl-lg">
                <PriceDialog props={row.original} />
              </div>
              <div className="w-full min-h-[30px] flex place-items-center justify-end px-2 rounded-lg bg-lightComponentBg border-slate-600/50 text-right">
                <span>
                  {row.original.price
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
  ];
  return columns;
};
