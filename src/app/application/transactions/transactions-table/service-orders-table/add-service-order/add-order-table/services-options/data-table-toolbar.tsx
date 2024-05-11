"use client";
import { CiExport } from "react-icons/ci";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { resetOrderServiceCart } from "@/redux/slices/orderServiceCartSlice";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  partsData?: any[];
  productsData?: any[];
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const dispatch = useDispatch();
  const isFiltered = table.getState().columnFilters.length > 0;
  const orderServiceCart = useSelector((state: any) => state.orderServiceCart);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 flex-wrap gap-y-2">
        <Input
          className="w-[150px] 2xl:w-[200px] h-10 bg-darkBg rounded-lg text-white border border-lightBorder placeholder:text-white/40 m-3"
          placeholder="Find Service"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 hover:bg-applicationPrimary hover:text-white"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {orderServiceCart.servicesCart.length !== 0 ? (
        <Button
          variant="ghost"
          type="button"
          onClick={() => dispatch(resetOrderServiceCart())}
          className="h-8 px-2 lg:px-3 hover:bg-red-500 hover:text-white text-xs m-3"
        >
          Reset
        </Button>
      ) : null}
    </div>
  );
}
