"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  QuestionMarkCircledIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { FaEye } from "react-icons/fa";
import { allPurchaseOrderServicesDisplay } from "@/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MdAddToPhotos } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

export const progress = [
  {
    value: "Created",
    label: "Created",
    icon: MdAddToPhotos,
    bgColor: "bg-[#999999]",
    textColor: "text-[#999999]",
    description: "The repair request is created and logged into the system.",
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: TbProgressBolt,
    bgColor: "bg-[#CD8D5E]",
    textColor: "text-[#CD8D5E]",
    description: "The services are currently being worked on by mechanics.",
  },
  {
    value: "Quality Checks",
    label: "Quality Checks ",
    icon: PiMagnifyingGlassFill,
    bgColor: "bg-[#5E8ACD]",
    textColor: "text-[#5E8ACD]",
    description:
      "A thorough quality check is performed to ensure the services meets standards.",
  },
  {
    value: "Ready for Pick-up",
    label: "Ready for Pick-up ",
    icon: RiUserReceived2Fill,
    bgColor: "bg-[#B0CD5E]",
    textColor: "text-[#B0CD5E]",
    description:
      "The services has been successfully completed and the vehicle is ready to be for Pick-up.",
  },
  {
    value: "Completed",
    label: "Completed ",
    icon: MdVerified,
    bgColor: "bg-[#5ECD8A]",
    textColor: "text-[#5ECD8A]",
    description:
      "The services has been successfully completed and the vehicle is returned to the customer.",
  },
];

export const initialState = (branches: any) => {
  const columns: ColumnDef<allPurchaseOrderServicesDisplay>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Order ID</span>
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
              className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-white group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-white group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <div className="flex flex-col">
              <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.id}
              </p>
              <p className="max-w-[181px] truncate text-white/50">
                {format(row.original.created_at, "PPPP")}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "customer_first_name",
      accessorKey: "customer_first_name",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <p className="max-w-[110px] 2xl:max-w-[220px] truncate ">
            {row.original.customer_first_name} {row.original.customer_last_name}
          </p>
        );
      },
    },
    {
      accessorKey: "employees",
      header: "Supervised by",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <Avatar className="w-10 h-10 cursor-pointer z-0 rounded-md">
              <AvatarImage
                src={row.original.supervisor.image_url}
                alt={row.original.supervisor.first_name}
              />
              <AvatarFallback className="bg-darkBg rounded-md">
                {row.original.supervisor.first_name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="max-w-[100px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.supervisor.first_name}{" "}
                {row.original.supervisor.last_name}
              </p>
              <p className="max-w-[181px] truncate text-white/50">
                {row.original.supervisor.roles.role}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "branch",
      accessorKey: "branches",
      accessorFn: (row) => row.inventory.branches.branch_name,
      header: "Branch",
      cell: ({ row }) => {
        const item = branches?.find(
          (item: any) =>
            item.value === row.original.inventory.branches.branch_name
        );

        if (!item) {
          return null;
        }
        return <p className="max-w-[85px] truncate">{item.label}</p>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "purchased",
      accessorKey: "branches",
      header: "Purchased",
      cell: ({ row }) => {
        if (
          row.original.purchase_products.length > 0 ||
          row.original.purchase_parts.length > 0
        ) {
          return (
            <div className="flex place-items-center gap-1">
              <p
                className={
                  "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-applicationPrimary pl-2 pr-1 py-1 rounded-3xl font-semibold"
                }
              >
                Services
                <span className="rounded-full bg-white text-black p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                  {row.original.purchase_services.length}
                </span>
              </p>
              <TooltipProvider delayDuration={0} skipDelayDuration={1000}>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="rounded-full bg-darkGray text-white p-1 px-2 text-center flex justify-center place-items-center line-clamp-none font-semibold">
                      {row.original.purchase_services.length > 0 &&
                      row.original.purchase_products.length > 0 &&
                      row.original.purchase_parts.length > 0
                        ? "+2"
                        : row.original.purchase_parts.length > 0
                        ? "+1"
                        : row.original.purchase_products.length > 0
                        ? "+1"
                        : ""}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-transparent border-none shadow-none flex gap-2 place-items-center">
                    {row.original.purchase_products.length > 0 && (
                      <p
                        className={
                          "w-fit text-xs flex place-items-center gap-1 truncate text-black bg-white pl-2 pr-1 py-1 rounded-3xl font-semibold shadow-2xl"
                        }
                      >
                        Products
                        <span className="rounded-full bg-black text-white p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                          {row.original.purchase_products.length}
                        </span>
                      </p>
                    )}
                    {row.original.purchase_parts.length > 0 && (
                      <p
                        className={
                          "w-fit text-xs flex place-items-center gap-1 truncate text-black bg-white pl-2 pr-1 py-1 rounded-3xl font-semibold shadow-2xl"
                        }
                      >
                        Parts
                        <span className="rounded-full bg-black text-white p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                          {row.original.purchase_parts.length}
                        </span>
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        } else if (row.original.purchase_services.length > 0) {
          return (
            <p
              className={
                "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-applicationPrimary pl-2 pr-1 py-1 rounded-3xl font-semibold"
              }
            >
              Services
              <span className="rounded-full bg-white text-black p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                {row.original.purchase_services.length}
              </span>
            </p>
          );
        }
      },
    },
    {
      id: "progress_entries",
      accessorKey: "progress_entries",
      accessorFn: (row) =>
        row?.progress_entries[row.progress_entries.length - 1]?.progress_name,
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Progress</span>
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
              className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-white group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-white group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },

      cell: ({ row }) => {
        const sortedProgressEntries = row?.original.progress_entries
          .sort(
            (a: any, b: any) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
          .reverse();

        const item = progress.find(
          (item) => item.value === sortedProgressEntries[0]?.progress_name
        );

        if (!item) {
          return null;
        }
        return (
          <div className="w-[180px] 2xl:w-[230px] gap-1 flex flex-col">
            <span
              className={cn(
                `font-bold flex place-items-center gap-1`,
                item.textColor
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </span>
            <div className="w-full flex justify-between place-items-center gap-1.5">
              <div
                className={cn(
                  `py-1 w-full rounded-sm hover:scale-125 transition-all duration-300 hover:shadow-2xl`,
                  item.bgColor,
                  item.value === "Created" ? "motion-safe:animate-pulse" : ""
                )}
              ></div>
              <div
                className={cn(
                  `py-1 w-full rounded-sm hover:scale-125 transition-all duration-300 hover:shadow-2xl`,
                  item.bgColor,
                  row.original.progress_entries.length < 2 ? "opacity-10" : "",
                  item.value === "In Progress"
                    ? "motion-safe:animate-pulse"
                    : ""
                )}
              ></div>
              <div
                className={cn(
                  `py-1 w-full rounded-sm hover:scale-125 transition-all duration-300 hover:shadow-2xl`,
                  item.bgColor,
                  row.original.progress_entries.length < 3 ? "opacity-10" : "",
                  item.value === "Quality Checks"
                    ? "motion-safe:animate-pulse"
                    : ""
                )}
              ></div>
              <div
                className={cn(
                  `py-1 w-full rounded-sm hover:scale-125 transition-all duration-300 hover:shadow-2xl`,
                  item.bgColor,
                  row.original.progress_entries.length < 4 ? "opacity-10" : "",
                  item.value === "Ready for Pick-up"
                    ? "motion-safe:animate-pulse"
                    : ""
                )}
              ></div>
              <div
                className={cn(
                  `py-1 w-full rounded-sm hover:scale-125 transition-all duration-300 hover:shadow-2xl`,
                  item.bgColor,
                  row.original.progress_entries.length < 5 ? "opacity-10" : ""
                )}
              ></div>
            </div>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-full px-4 hover:bg-applicationPrimary hover:text-white hover:border-applicationPrimary transition-all duration-300 primary-glow"
            href={`/application/transactions/order_service/${id}`}
          >
            <FaEye className="mr-2 " />
            View
          </Link>
        );
      },
    },
    {
      id: "barcode",
      accessorKey: "barcode",
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      accessorFn: (row) => format(new Date(row.created_at), "PPP"),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
  return columns;
};
