"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { DepartmentsDisplay } from "@/types";
import Link from "next/link";

export const initateColumns = (departments: any) => {
  const columns: ColumnDef<DepartmentsDisplay>[] = [
    {
      id: "department_name",
      accessorKey: "department_name",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-black hover:bg-slate-50/40"
              >
                <span>Name</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex place-items-center gap-4 z-0">
            <Avatar className="w-10 h-10 cursor-pointer z-0">
              <AvatarImage src={item.image_url} alt={item.image_url} />
              <AvatarFallback className="bg-slate-300">{`${item.department_name[0]}`}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {item.department_name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "description",
      accessorKey: "description",
      header: "MFO/PAP (Major Final Outputs)",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex place-items-center gap-4 z-0">
            <div className="flex flex-col">
              <p className="max-w-[590px] 2xl:max-w-[920px] truncate font-semibold">
                {item.description}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-sm px-4 hover:bg-applicationPrimary hover:text-black hover:border-applicationPrimary transition-all duration-300 "
            href={`/application/departments/department/${id}`}
          >
            View
          </Link>
        );
      },
    },
  ];

  return columns;
};
