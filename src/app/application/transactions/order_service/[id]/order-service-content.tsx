/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { allPurchaseOrderServicesDisplay } from "@/types";
import { MdOutlineMobileOff } from "react-icons/md";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { MdAddToPhotos } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { PiGearSixBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { MdOutlineReceiptLong } from "react-icons/md";
import { cn } from "@/lib/utils";
import UpdateProgressButton from "./update-progress/update-order-status-dialog";
import UndoProgressButton from "./undo-progress/undo-order-status-dialog";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import recieptLogo from "@/images/receipt-logo.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoIosBarcode } from "react-icons/io";

import { MdOutlineConfirmationNumber } from "react-icons/md";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlinePayments } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Barcode from "react-barcode";

import { DataTable as ProductOrders } from "./order-service-tables/product-orders/data-table";
import { DataTable as PartOrders } from "./order-service-tables/part-orders/data-table";
import { DataTable as ServiceOrders } from "./order-service-tables/service-orders/data-table";

import { initiateColumns as initiateProductOrdersColumns } from "./order-service-tables/product-orders/columns";
import { initiateColumns as initiatePartsOrdersColumns } from "./order-service-tables/part-orders/columns";
import { initiateColumns as initiateServiceOrdersColumns } from "./order-service-tables/service-orders/columns";

import { FaHandsHelping } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import Image from "next/image";

import smallVehicle from "@/images/vehicle-small.png";
import mediumVehicle from "@/images/vehicle-medium.png";
import largeVehicle from "@/images/vehicle-large.png";

import UpdateOrderButton from "./updated-order-service/update-order-dialog";
import UpdatePayment from "./update-payment/payment-dialog";
import RemarksButton from "./update-remarks/remarks-dialog";
import { useDispatch } from "react-redux";
import { setServiceCart } from "@/redux/slices/viewOrderServiceCartSlice";
import { setProgressEntries } from "@/redux/slices/progressEntriesSlice";
import { setCurrentOrderService } from "@/redux/slices/currentOrderServiceSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OrderContent({ orderService, nextProgress }: any) {
  const dispatch = useDispatch();
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => {
      toast("🔔 Notification", {
        description: "Printing...",
      });
    },
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  const data: allPurchaseOrderServicesDisplay = orderService[0];

  const servicesCart = data.purchase_services.map((service: any) => ({
    id: service.id,
    inventory_id: service.inventory_id,
    name: service.name,
    description: service.description,
    image: service.image_url,
    price: service.price,
  }));

  dispatch(setServiceCart(servicesCart));
  dispatch(setProgressEntries(data.progress_entries));
  dispatch(setCurrentOrderService(data));

  const [progress_entries_data, setProgressEntriesData] = useState<any>(
    data.progress_entries
      .map((progress: any) => ({
        id: progress.id,
        value: progress.progress_name,
        created_at: progress.created_at,
        icon:
          progress.progress_name === "Created"
            ? MdAddToPhotos
            : progress.progress_name === "In Progress"
            ? TbProgressBolt
            : progress.progress_name === "Completed"
            ? MdVerified
            : progress.progress_name === "Quality Checks"
            ? PiMagnifyingGlassFill
            : RiUserReceived2Fill,
        description: progress.description,
        order_service_id: progress.order_service_id,
      }))
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .reverse()
  );

  useEffect(() => {
    setProgressEntriesData(
      data.progress_entries
        .map((progress: any) => ({
          id: progress.id,
          value: progress.progress_name,
          created_at: progress.created_at,
          icon:
            progress.progress_name === "Created"
              ? MdAddToPhotos
              : progress.progress_name === "In Progress"
              ? TbProgressBolt
              : progress.progress_name === "Completed"
              ? MdVerified
              : progress.progress_name === "Quality Checks"
              ? PiMagnifyingGlassFill
              : RiUserReceived2Fill,
          description: progress.description,
          order_service_id: progress.order_service_id,
        }))
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .reverse()
    );
  }, [data.progress_entries]);

  return (
    <div className="w-full h-[788px] 2xl:h-[868px] flex max-w-[1840px] justify-center place-items-start gap-4">
      <div className="w-full h-full flex gap-8">
        <div className="w-[40%] 2xl:w-[30%] flex flex-col gap-8">
          <div className="w-full h-full flex flex-col gap-4 bg-darkComponentBg rounded-xl border border-lightBorder p-4">
            <div className="w-full flex flex-col gap-3">
              <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                Head Mechanic
              </h3>
              <div className="w-full flex gap-3">
                <Avatar className="w-20 h-20 cursor-pointer rounded-lg shadow-2xl primary-glow transition-all duration-300 border-2 border-applicationPrimary hover:border-applicationPrimary">
                  <AvatarImage
                    src={data.supervisor.image_url}
                    className=" shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary"
                  />
                  <AvatarFallback className="text-black shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary">{`${data.supervisor.first_name[0]} ${data.supervisor.last_name[0]}`}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  <h3 className="text-lg font-semibold text-applicationPrimary flex place-items-center gap-1 ">
                    <span>
                      {data.supervisor.first_name} {data.supervisor.last_name}
                    </span>
                  </h3>
                  <h3 className="text-sm font-semibold text-slate-400">
                    {data.supervisor.email}
                  </h3>
                  <h3 className="text-sm font-semibold text-slate-400">
                    {data.supervisor.contact_number}
                  </h3>
                </div>
              </div>
              <div className="w-full flex flex-col place-items-center gap-1">
                <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                  Mechanics
                </h3>
                <div className="w-full flex place-items-center -space-x-2">
                  {data.mechanic_entries.length > 1 ? (
                    data.mechanic_entries.map(
                      (mechanicData: any, i: number) => (
                        <TooltipProvider key={i}>
                          <Tooltip>
                            <TooltipTrigger>
                              <Avatar
                                className={cn(
                                  `z-[${i}] border-2 border-darkComponentBg`
                                )}
                              >
                                <AvatarImage
                                  src={mechanicData.mechanic.image_url}
                                  className="rounded-md"
                                />
                                <AvatarFallback className="bg-lightComponentBg text-xs">{`${mechanicData.mechanic.first_name[0]}${mechanicData.mechanic.last_name[0]}`}</AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent className="bg-applicationPrimary border-transparent text-black font-bold">
                              {mechanicData.mechanic.first_name}{" "}
                              {mechanicData.mechanic.last_name}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    )
                  ) : (
                    <div className="flex place-items-center gap-2">
                      <Avatar className={cn(`border-2 border-darkComponentBg`)}>
                        <AvatarImage
                          src={data.mechanic_entries[0].mechanic.image_url}
                          className="rounded-md"
                        />
                        <AvatarFallback className="bg-lightComponentBg text-xs">{`${data.mechanic_entries[0].mechanic.first_name[0]}${data.mechanic_entries[0].mechanic.last_name[0]}`}</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Separator className="bg-lightBorder" />
            <div className="w-full h-full flex flex-col gap-2">
              <div className="w-full flex justify-between place-items-center">
                <h3 className="w-full text-sm font-semibold text-slate-200 ">
                  Order Timeline
                </h3>
                <div className="w-fit flex place-items-center gap-3">
                  {progress_entries_data.length !== 1 &&
                  progress_entries_data.length !== 5 ? (
                    <UndoProgressButton
                      progress_entries={progress_entries_data}
                    />
                  ) : null}
                  {progress_entries_data.length < 5 ? (
                    <UpdateProgressButton
                      progress_entries={progress_entries_data}
                      nextProgress={nextProgress}
                    />
                  ) : null}
                </div>
              </div>
              <div
                className={cn(
                  "w-full h-full flex-col flex place-items-center",
                  data.progress_entries?.length > 4
                    ? "justify-center"
                    : "justify-start"
                )}
              >
                <div className="w-full h-fit">
                  {progress_entries_data.map((progress: any, i: number) => (
                    <div
                      className={cn(
                        "relative pl-8 sm:pl-16 py-2 2xl:py-3 group",
                        progress.value === progress_entries_data[0].value
                          ? ""
                          : "opacity-30"
                      )}
                      key={i}
                    >
                      <div className="font-sm font-bold text-md text-black mb-1 sm:mb-0">
                        {progress.value}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[1.5rem] before:self-start before:-translate-x-1/2 before:-translate-y-2">
                        <div
                          className={cn(
                            "absolute left-2 sm:left-0 w-11 h-11 border-2 box-content rounded-full sm:ml-[1.5rem] -translate-x-1/2 -translate-y-2 flex justify-center place-items-center text-center transition-all duration-300",
                            progress.value === progress_entries_data[0].value
                              ? "animate-pulse-on-ping hover:scale-125"
                              : "",
                            `bg-applicationPrimary`
                          )}
                        >
                          {<progress.icon />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-400 flex place-items-center gap-2">
                            <FaClockRotateLeft />
                            {formatDistanceToNow(
                              new Date(progress.created_at),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                          <span className="text-xs 2xl:text-sm text-slate-200">
                            {progress.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-8">
          <div className="w-full h-full flex gap-8">
            <div className="w-[55%] 2xl:w-[40%] h-full bg-darkComponentBg rounded-xl border border-lightBorder p-4 flex flex-col justify-around gap-3 ">
              <div className="flex flex-col gap-1">
                <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                  Customer Information
                </h3>

                <div className="w-full flex gap-3">
                  <Avatar className=" w-16 h-16 2xl:w-20 2xl:h-20 cursor-pointer rounded-lg shadow-2xl primary-glow transition-all duration-300 border-transparent hover:border-applicationPrimary">
                    <AvatarImage
                      src={data.mobile_user?.image_url}
                      className=" shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary"
                    />
                    <AvatarFallback className="text-black shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary">{`${data.customer_first_name[0]}${data.customer_last_name[0]}`}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col w-full">
                    <h3 className="text-md 2xl:text-lg font-semibold text-slate-200 flex place-items-center gap-1 ">
                      <span>
                        {data.customer_first_name} {data.customer_last_name}{" "}
                      </span>
                      {data.mobile_user === null ? (
                        <MdOutlineMobileOff />
                      ) : (
                        <MdOutlineMobileFriendly />
                      )}
                    </h3>
                    <h3 className="text-xs font-semibold text-slate-400">
                      {data.customer_email}
                    </h3>
                    <h3 className="text-xs font-semibold text-slate-400">
                      {data.customer_contact_number}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                  Payment and Mobile
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="w-full flex justify-between gap-3">
                    <div className="w-full flex flex-col gap-1">
                      <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                        <MdOutlineConfirmationNumber /> Redeem Code
                      </h3>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                        <GrStatusUnknown /> Payment Status
                      </h3>
                      <h3
                        className={cn(
                          "text-xs text-slate-400 ml-4 font-bold",
                          data.status === "Pending"
                            ? "text-red-500"
                            : "text-green-500"
                        )}
                      >
                        {data.status}
                      </h3>
                    </div>
                  </div>
                  <div className="w-full flex justify-between gap-3">
                    <div className="w-full flex flex-col gap-1">
                      <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                        <MdOutlinePayments /> Payment Method
                      </h3>
                      <h3 className="text-xs font-semibold text-slate-400 ml-4">
                        {data.payment_method ? data.payment_method : "N/A"}
                      </h3>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                        <FaHandHoldingUsd /> Amount Paid
                      </h3>
                      <h3 className="text-xs font-semibold text-slate-400 ml-4">
                        {`₱ ${data.amount_paid
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex-col bg-darkComponentBg rounded-xl border border-lightBorder p-2 2xl:p-1 relative overflow-hidden group">
              <Image
                src={
                  data.vehicle_entries[0].type === "small"
                    ? smallVehicle
                    : data.vehicle_entries[0].type === "medium"
                    ? mediumVehicle
                    : largeVehicle
                }
                alt="Vehicle"
                className="rounded-xl w-[600px] absolute -right-[55%] 2xl:-right-[6rem] top-[30%] group-hover:-right-[50%] group-hover:2xl:-right-[5.3rem] transition-all duration-300"
              />
              <div className="w-full h-full flex flex-col gap-2 p-4">
                <h3 className="w-full text-sm font-semibold text-slate-200 ">
                  Vehicle Information
                </h3>
                <div className="w-full h-full flex gap-2">
                  <div className="w-full h-full flex flex-col gap-2">
                    <h3 className="text-3xl 2xl:text-4xl font-bold">
                      {data.vehicle_entries[0].car_brand}{" "}
                      {data.vehicle_entries[0].car_model}
                    </h3>
                    <div className="h-full flex flex-col justify-between gap-1.5">
                      <div className="w-full flex justify-between gap-3">
                        <div className="w-full flex flex-col gap-1">
                          <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                            ODO Reading
                          </h3>
                          <h3 className="text-xs font-semibold text-slate-400">
                            {data.vehicle_entries[0].odo_reading}
                          </h3>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                          <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                            Type
                          </h3>
                          <h3 className="text-xs font-semibold text-slate-400">
                            {data.vehicle_entries[0].type.toUpperCase()}
                          </h3>
                        </div>
                      </div>
                      <div className="w-full flex justify-between gap-3">
                        <div className="w-full flex flex-col gap-1">
                          <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300">
                            Engine Number
                          </h3>
                          <h3 className="text-xs font-semibold text-slate-400 max-w-[140px] truncate">
                            {data.vehicle_entries[0].engine_number}
                          </h3>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                          <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                            Chassis Number
                          </h3>
                          <h3 className="text-xs font-semibold text-slate-400 max-w-[140px] truncate">
                            {data.vehicle_entries[0].chassis_number}
                          </h3>
                        </div>
                      </div>
                      <div className="w-full flex justify-start place-items-center gap-3">
                        <div className="w-fit py-1 px-3 flex flex-col border border-dashed rounded-xl">
                          <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                            <IoIosBarcode /> Plate Number
                          </h3>
                          <h3 className="text-lg font-semibold text-black ml-4  ">
                            {data.vehicle_entries[0].plate_number}
                          </h3>
                        </div>
                        <RemarksButton data={data} />
                      </div>
                    </div>
                  </div>
                  <div className="w-[80%] h-full flex justify-end"></div>
                </div>
              </div>
            </div>
          </div>
          <ScrollArea className="w-full flex flex-col h-[1800px] bg-darkComponentBg rounded-xl border border-lightBorder gap-0 relative">
            <div className="w-full flex place-items-center justify-between gap-3 py-6 px-6 border-b border-b-lightBorder">
              <span className="font-bold">Purchase Summary</span>
              <div className="w-fit flex gap-5">
                {data.status === "Pending" &&
                data.progress_entries.length >= 4 ? (
                  <UpdatePayment data={data} />
                ) : null}

                {data.progress_entries.length === 2 ||
                data.progress_entries.length === 3 ? (
                  <UpdateOrderButton data={data} />
                ) : null}
                <Button
                  className="bg-white hover:bg-white/70 flex gap-1 shadow-lg text-black"
                  onClick={() => {
                    handlePrint(null, () => contentToPrint.current);
                  }}
                >
                  <MdOutlineReceiptLong />
                  Print
                </Button>
              </div>
            </div>
            <div className="w-full px-6">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                // defaultValue={["item-1", "item-2", "item-3"]}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className=" sticky top-0">
                    <span className="flex place-items-center gap-3 font-regular">
                      <FaHandsHelping />
                      Services
                      <span className="text-xs bg-applicationPrimary border-2 px-3 rounded-full">
                        {data.purchase_services.length}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="rounded-xl">
                    <ServiceOrders
                      columns={initiateServiceOrdersColumns()}
                      data={data.purchase_services}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="sticky top-0">
                    <span className="flex place-items-center gap-3 font-regular">
                      <BsBoxSeam />
                      Products
                      <span className="text-xs bg-applicationPrimary border-2 px-3 rounded-full">
                        {data.purchase_products.length}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="rounded-xl">
                    <ProductOrders
                      columns={initiateProductOrdersColumns()}
                      data={data.purchase_products}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="sticky top-0">
                    <span className="flex place-items-center gap-3 font-regular">
                      <PiGearSixBold />
                      Parts
                      <span className="text-xs bg-applicationPrimary border-2 px-3 rounded-full">
                        {data.purchase_parts.length}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <PartOrders
                      columns={initiatePartsOrdersColumns()}
                      data={data.purchase_parts}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="w-full flex-col relative px-2 mb-[80px]">
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                  <span className="w-full text-end text-slate-400">
                    Subtotal
                  </span>
                  <span className="w-[20%] text-end">{`₱ ${(
                    data.purchase_products.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                    data.purchase_parts.reduce(
                      (acc: any, part: any) => acc + part.price * part.quantity,
                      0
                    ) +
                    data.purchase_services.reduce(
                      (acc: any, service: any) => acc + service.price,
                      0
                    )
                  )
                    .toFixed(
                      // sum all the products and parts
                      2
                    )
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                </div>
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                  <span className="w-full text-end text-slate-400">Tax</span>
                  <span className="w-[20%] text-end">₱ 0.00</span>
                </div>
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                  <span className="w-full text-end text-slate-400">VAT</span>
                  <span className="w-[20%] text-end">₱ 0.00</span>
                </div>
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                  <span className="w-full text-end text-slate-400">
                    Discount {data.discount > 0 && `(${data.discount}%)`}
                  </span>
                  <span className="w-[20%] text-end">
                    {`- ₱ ${(
                      (data.purchase_products.reduce(
                        (acc: any, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      ) +
                        data.purchase_parts.reduce(
                          (acc: any, part: any) =>
                            acc + part.price * part.quantity,
                          0
                        ) +
                        data.purchase_services.reduce(
                          (acc: any, service: any) => acc + service.price,
                          0
                        )) *
                      (data.discount / 100)
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full py-6 px-8 flex justify-between absolute bottom-[-4px] bg-darkGray">
              <span className="w-full text-left text-lg font-bold">Total</span>
              <span className="w-full text-right text-lg font-bold">{`₱ ${(
                (data.purchase_products.reduce(
                  (acc: any, product: any) =>
                    acc + product.price * product.quantity,
                  0
                ) +
                  data.purchase_parts.reduce(
                    (acc: any, part: any) => acc + part.price * part.quantity,
                    0
                  ) +
                  data.purchase_services.reduce(
                    (acc: any, service: any) => acc + service.price,
                    0
                  )) *
                ((100 - data.discount) / 100)
              )
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <div
          className="w-full min-h-[600px] 2xl:min-h-[680px] flex flex-col place-items-center"
          ref={contentToPrint}
        >
          <div className="w-full flex flex-col gap-0.5 justify-center place-items-center py-2">
            <img src={recieptLogo.src} alt="logo" className="mb-2" />
            <p className="w-full text-center text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
              {`${data.inventory.branches.branch_location}`}
            </p>
            <p className="w-full text-center text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
              {`${data.inventory.branches.contact_number}`}
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-col justify-between gap-1">
              <h2 className="flex gap-1 place-items-center text-sm font-bold text-black space-mono-regular tracking-tighter">
                {/* <FiBox /> */}
                Order Details
              </h2>
              <p className="text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
                {`ID: ${data.id}`}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Customer Name
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.customer_first_name} {data.customer_last_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Contact Number
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.customer_contact_number}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Email
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.customer_email}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Branch
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.inventory.branches.branch_name}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Payment Method
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.payment_method}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Status
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.status}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Cashier
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.employee.first_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Head Mechanic
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {data.supervisor.first_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Redeem Code
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Created At
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {format(new Date(data.created_at), "P")}
                </p>
              </div>
            </div>
            <Separator className="bg-slate-400" />
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="flex gap-1 place-items-center text-[13px] font-semibold text-black space-mono-regular tracking-tighter">
                  {/* <BsBoxes /> */}
                  Purchased Services
                </p>
              </div>
              {data.purchase_services.map((item: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <div className="flex gap-1">
                    <p className="max-w-[95px] truncate text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                    ₱ {item.price.toFixed(2)}
                  </p>
                </div>
              ))}
              <Separator className="bg-slate-400" />
              <div className="flex justify-between mb-3">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Total
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱{" "}
                  {data.purchase_services
                    .reduce((acc: any, item: any) => acc + item.price, 0)
                    .toFixed(2)}
                </p>
              </div>
              <Separator className="bg-slate-400" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="flex gap-1 place-items-center text-[13px] font-semibold text-black space-mono-regular tracking-tighter">
                  {/* <BsBoxes /> */}
                  Purchased Products
                </p>
              </div>
              {data.purchase_products.map((item: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <div className="flex gap-1">
                    <p className="max-w-[95px] truncate text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                      {` x ${item.quantity}`}
                    </p>
                  </div>
                  <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                    ₱ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <Separator className="bg-slate-400" />
              <div className="flex justify-between mb-3">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Total
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱{" "}
                  {data.purchase_products
                    .reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <Separator className="bg-slate-400" />
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <p className="flex gap-1 place-items-center text-[13px] font-semibold text-black space-mono-regular tracking-tighter">
                    {/* <SiTemporal /> */}
                    Purchased Parts
                  </p>
                </div>
                {data.purchase_parts.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <div className="flex gap-1">
                      <p className="max-w-[95px] truncate text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                        {` x ${item.quantity}`}
                      </p>
                    </div>
                    <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                      ₱ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <Separator className="bg-slate-400" />

                <div className="flex justify-between mb-3">
                  <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                    Total
                  </p>
                  <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                    ₱{" "}
                    {data.purchase_parts
                      .reduce(
                        (acc: any, item: any) =>
                          acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>

              <Separator className="bg-slate-400" />

              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Subtotal
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱{" "}
                  {(
                    data.purchase_products.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    ) +
                    data.purchase_parts.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    ) +
                    data.purchase_services.reduce(
                      (acc: any, item: any) => acc + item.price,
                      0
                    )
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Tax
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱ 0
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  VAT
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱ 0
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Discount ({data.discount}%)
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  - ₱{" "}
                  {(
                    (data.purchase_products.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    ) +
                      data.purchase_parts.reduce(
                        (acc: any, item: any) =>
                          acc + item.price * item.quantity,
                        0
                      ) +
                      data.purchase_services.reduce(
                        (acc: any, item: any) => acc + item.price,
                        0
                      )) *
                    (data.discount / 100)
                  ).toFixed(2)}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-400" />
            <div className="flex flex-col gap-1">
              <div className="flex justify-between place-items-center">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Total
                </p>
                <p className="text-md 2xl:text-lg text-black space-mono-regular tracking-tighter font-bold">
                  ₱ {data.total_price.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Amount Paid
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  - ₱ {data.amount_paid.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Change
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱ {(data.amount_paid - data.total_price).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="w-full max-w-full flex flex-col place-items-center gap-4">
              <Barcode
                value={data.id ? data.id : "No Barcode"}
                displayValue={false}
                background="transparent"
                lineColor="black"
                width={1}
                height={80}
                margin={0}
                renderer="img"
              />
            </div>
            <p className="w-full text-center text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
              Visit us at
              <br />{" "}
              <span className="underline">
                https://trackxp-sapsc.vercel.app/
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
