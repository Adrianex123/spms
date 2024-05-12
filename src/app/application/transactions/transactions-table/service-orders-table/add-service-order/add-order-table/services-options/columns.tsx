"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  addServiceToCart,
  removeServiceFromCart,
} from "@/redux/slices/orderServiceCartSlice";
import { cn } from "@/lib/utils";
import { IoMdRemove } from "react-icons/io";

type option = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  duration: number;
  price: number;
  status: string;
  created_at: string;
  inventory: any;
};

export const initiateColumns = (dispatch: any, servicesCart: any) => {
  const columns: ColumnDef<option>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Service",
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

            <div className="flex flex-col justify-between 2xl:py-2">
              <p className="text-xs max-w-[100px] 2xl:max-w-[200px] truncate font-semibold">
                {row.original.name}
              </p>
              <p className="text-xs text-black/50">
                Status:
                <span
                  className={cn(
                    "",
                    row.original.status === "Unavailable" ? "text-red-500" : ""
                  )}
                >
                  {" "}
                  {row.original.status}
                </span>
              </p>
              <p className="text-xs text-black/50">
                {`Duration: ${row.original.duration} mins`}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return <div className="w-full text-right">Action</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-2 justify-end">
            <Button
              className={cn(
                "text-xs font-bold rounded-md flex gap-2 hover:text-black transition-all duration-300 px-6 py-2 cursor-pointer",
                row.original.status === "Unavailable"
                  ? "bg-red-500"
                  : "bg-applicationPrimary hover:bg-applicationPrimary/70"
              )}
              disabled={
                servicesCart.some(
                  (service: any) => service.id === row.original.id
                ) || row.original.status === "Unavailable"
              }
              onClick={() => {
                dispatch(
                  addServiceToCart({
                    id: row.original.id,
                    inventory_id: row.original.inventory.id,
                    name: row.original.name,
                    description: row.original.description,
                    status: row.original.status,
                    image: row.original.image_url,
                    duration: row.original.duration,
                    price: row.original.price,
                  })
                );
              }}
            >
              {servicesCart.some(
                (service: any) => service.id === row.original.id
              )
                ? "Added"
                : row.original.status === "Unavailable"
                ? "Unavailable"
                : "Add"}
            </Button>
            {servicesCart.some(
              (service: any) => service.id === row.original.id
            ) && (
              <Button
                className="text-xs font-bold rounded-md flex gap-2 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600"
                type="button"
                onClick={() => {
                  dispatch(removeServiceFromCart(row.original.id));
                }}
              >
                <IoMdRemove />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return columns;
};
