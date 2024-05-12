"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  addPartToCart,
  removePartFromCart,
} from "@/redux/slices/viewOrderCartSlice";
import { cn } from "@/lib/utils";
import { IoMdRemove } from "react-icons/io";

type option = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  price: number;
  barcode: string;
  status: string;
  created_at: string;
  brands: any;
  inventory: any;
};

export const initiateColumns = (dispatch: any, partsCart: any) => {
  const columns: ColumnDef<option>[] = [
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

            <div className="flex flex-col justify-between 2xl:py-2">
              <p className="text-xs max-w-[100px] 2xl:max-w-[200px] truncate font-semibold">
                {row.original.name}
              </p>
              <p className="text-sx max-w-[120px] 2xl:max-w-[180px] truncate text-black font-bold">
                {`₱ ${row.original.price} • ${row.original.brands.brand_name}`}
              </p>
              <p className="text-xs max-w-[181px] truncate text-black/50">
                Stock:
                <span
                  className={cn(
                    "",
                    row.original.stock_quantity === 0 ? "text-red-500" : ""
                  )}
                >
                  {" "}
                  {row.original.stock_quantity}
                </span>
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
                row.original.stock_quantity === 0
                  ? "bg-red-500"
                  : "bg-applicationPrimary hover:bg-applicationPrimary/70"
              )}
              type="button"
              disabled={
                partsCart.some(
                  (product: any) => product.part_id === row.original.id
                ) || row.original.stock_quantity === 0
              }
              onClick={() => {
                dispatch(
                  addPartToCart({
                    part_id: row.original.id,
                    inventory_id: row.original.inventory.id,
                    name: row.original.name,
                    description: row.original.description,
                    image: row.original.image_url,
                    barcode: row.original.barcode,
                    brand_name: row.original.brands.brand_name,
                    quantity: 1,
                    price: row.original.price,
                  })
                );
              }}
            >
              {partsCart.some((part: any) => part.part_id === row.original.id)
                ? "Added"
                : row.original.stock_quantity === 0
                ? "Out of Stock"
                : "Add"}
            </Button>
            {partsCart.some(
              (part: any) => part.part_id === row.original.id
            ) && (
              <Button
                className="text-xs font-bold rounded-md flex gap-2 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600"
                type="button"
                onClick={() => {
                  dispatch(removePartFromCart(row.original.id));
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
