"use client";
import { useState } from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    barcode: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 999,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full flex flex-col justify-between gap-1 bg-darkBg rounded-xl">
      <div className="w-full h-full overflow-hidden">
        <ScrollArea className="w-full relative">
          <Table>
            <TableHeader className="border-none ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b-lightBorder shadow-sm"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="border-none">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className=" border-none hover:bg-slate-300/20 transition-all duration-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Services Empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter className="bg-transparent border-white/10 border-dashed">
              <TableRow>
                <TableCell colSpan={1} className="h-24 font-bold">
                  Total
                </TableCell>
                <TableCell colSpan={1} className="h-24">
                  <div className="w-full flex gap-4 justify-end place-items-center">
                    <p className="text-sm truncate text-white font-bold">
                      ₱{" "}
                      {data.length > 0
                        ? data
                            .reduce(
                              (acc: any, curr: any) => acc + curr.price,
                              0
                            )
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : 0}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
