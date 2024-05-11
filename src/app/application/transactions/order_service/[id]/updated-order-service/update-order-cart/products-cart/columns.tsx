"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  decrementProductQuantity,
  incrementProductQuantity,
} from "@/redux/slices/viewOrderCartSlice";

type cartItem = {
  product_id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  barcode: string;
  uom_name: string;
  status: string;
  created_at: string;
  uoms: any;
  inventory: any;
};

export const initiateColumns = (dispatch: any, productsDataOptions: any) => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between gap-4">
            <Avatar className="w-14 h-14 2xl:w-20 2xl:h-20 cursor-pointer z-0 rounded-md">
              <AvatarImage src={row.original.image} alt={row.original.image} />
              <AvatarFallback className="bg-lightBorder rounded-md">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-start 2xl:py-2">
              <p className="text-md max-w-[200px] 2xl:max-w-[200px] truncate text-slate-50 font-bold">
                {row.original.name}
              </p>
              <p className="text-sm max-w-[170px] 2xl:max-w-[180px] truncate text-white font-semibold">
                {`₱ ${row.original.price} • ${row.original.uom_name}`}
              </p>
              <p className="text-sm max-w-[120px] 2xl:max-w-[140px] truncate text-slate-400">
                {`Barcode: ${row.original.barcode}`}
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
            <Button
              className="text-xs font-bold rounded-md flex gap-2 hover:text-white transition-all duration-300 px-4 py-2 cursor-pointer bg-transparent hover:bg-applicationPrimary border border-lightBorder hover:border-transparent"
              type="button"
              onClick={() => {
                dispatch(decrementProductQuantity(row.original.product_id));
              }}
            >
              <FaMinus />
            </Button>
            <p className="text-white font-bold">{row.original.quantity}</p>
            <Button
              className="text-xs font-bold rounded-md flex gap-2 hover:text-white transition-all duration-300 px-4 py-2 cursor-pointer bg-transparent hover:bg-applicationPrimary border border-lightBorder hover:border-transparent"
              type="button"
              disabled={
                productsDataOptions.find(
                  (product: any) => product.id === row.original.product_id
                ).stock_quantity === 0
              }
              onClick={() => {
                dispatch(incrementProductQuantity(row.original.product_id));
              }}
            >
              <FaPlus />
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
          <div className="w-full flex min-w-[150px] gap-2 justify-end text-white font-bold">
            ₱{" "}
            {(row.original.price * row.original.quantity)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        );
      },
    },
  ];
  return columns;
};
