"use client";
import * as React from "react";
import { CiExport } from "react-icons/ci";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { statuses } from "./columns";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import AddProductButton from "./add-order/add-order-dialog";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import DatePickerWithRange from "./date-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  allStocksData?: any[];
  foodsuppliesData?: any[];
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const branchesSlice = useSelector((state: any) => state.branches);

  const createdAtColumn = table.getColumn("created_at");

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 flex-wrap gap-y-2">
        <Input
          className="w-[200px] 2xl:w-[250px] h-10 border border-slate-400 rounded-lg text-black"
          placeholder="Find Request ID"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
        />

        {table.getColumn("branch") && (
          <DataTableFacetedFilter
            column={table.getColumn("branch")}
            title="Branch"
            options={branchesSlice}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        {/* <DatePickerWithRange /> */}
        <AddProductButton />
      </div>
    </div>
  );
}
