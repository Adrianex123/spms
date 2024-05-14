"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  decrementEquipmentQuantity,
  incrementEquipmentQuantity,
} from "@/redux/slices/orderCartSlice";

type cartItem = {
  stocks: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  status: string;
  created_at: string;
  inventory: any;
};

export const initiateColumns = (dispatch: any, allStocksDataOptions: any) => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Equipment",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between gap-4">
            <Avatar className="w-14 h-14 2xl:w-20 2xl:h-20 cursor-pointer z-0 rounded-md">
              <AvatarImage src={row.original.image} alt={row.original.image} />
              <AvatarFallback className="bg-slate-700 rounded-md text-white">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-start 2xl:py-2">
              <p className="text-md max-w-[200px] 2xl:max-w-[200px] truncate text-black font-bold">
                {row.original.name}
              </p>
              {/* <p className="text-sm max-w-[170px] 2xl:max-w-[180px] truncate text-black font-semibold">
                {`₱ ${row.original.price} • ${row.original.brand_name}`}
              </p> */}
              <p className="text-sm max-w-[120px] 2xl:max-w-[140px] truncate text-slate-800">
                {`Quantity: ${row.original.quantity}`}
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
              className="text-xs font-bold rounded-md flex gap-2 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer hover:bg-applicationPrimary border border-lightBorder hover:border-transparent"
              type="button"
              onClick={() => {
                dispatch(decrementEquipmentQuantity(row.original.stocks));
              }}
            >
              <FaMinus />
            </Button>
            <p className="text-black font-bold">{row.original.quantity}</p>
            <Button
              className="text-xs font-bold rounded-md flex gap-2 hover:text-black transition-all duration-300 px-4 py-2 cursor-pointer hover:bg-applicationPrimary border border-lightBorder hover:border-transparent"
              type="button"
              disabled={
                allStocksDataOptions.find(
                  (equipment: any) => equipment.id === row.original.stocks
                ).stock_quantity === 0
              }
              onClick={() => {
                dispatch(incrementEquipmentQuantity(row.original.stocks));
              }}
            >
              <FaPlus />
            </Button>
          </div>
        );
      },
    },
  ];
  return columns;
};
