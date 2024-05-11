/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { format } from "date-fns";
import UpdateOrderStatusButton from "./update-order-status/update-order-status-dialog";
import Barcode from "react-barcode";
import { toast } from "sonner";
import { MdOutlineReceiptLong } from "react-icons/md";

import { DataTable as ProductOrders } from "./order-tables/product-orders/data-table";
import { DataTable as PartOrders } from "./order-tables/part-orders/data-table";
import { initiateColumns as initiateProductOrdersColumns } from "./order-tables/product-orders/columns";
import { initiateColumns as initiatePartsOrdersColumns } from "./order-tables/part-orders/columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import recieptLogo from "@/images/receipt-logo.svg";
import { FiBox } from "react-icons/fi";
import { SiTemporal } from "react-icons/si";
import { BsBoxes } from "react-icons/bs";
import { cn } from "@/lib/utils";

export default function OrderContent({ order }: any) {
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

  useEffect(() => {
    handlePrint(null, () => contentToPrint.current);
  }, []);

  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-start gap-4">
      <ScrollArea className="w-[650px] 2xl:w-[55%] h-[720px] 2xl:h-[838px] px-8 pt-4 pb-8  bg-darkComponentBg rounded-xl border border-lightBorder shadow-lg gap-0 relative">
        <Accordion
          type="multiple"
          className="w-full rounded-none relative"
          defaultValue={["item-2", "item-3"]}
        >
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold sticky top-0">
              Purchased Products
            </AccordionTrigger>
            <AccordionContent className="rounded-xl">
              <ProductOrders
                columns={initiateProductOrdersColumns()}
                data={order[0].purchase_products}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold sticky top-0">
              Purchased Parts
            </AccordionTrigger>
            <AccordionContent className="bg-darkComponentBg rounded-xl">
              <PartOrders
                columns={initiatePartsOrdersColumns()}
                data={order[0].purchase_parts}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      <div className="w-[30%] 2xl:w-[25%] min-h-[600px] 2xl:min-h-[680px] flex flex-col gap-4">
        <div className="w-full h-full 2xl:min-h-[680px] p-8 bg-darkComponentBg flex flex-col gap-5 2xl:gap-7 rounded-xl shadow-lg border border-lightBorder">
          <div className="flex flex-col justify-between gap-2">
            <div className="w-full flex justify-between">
              <h2 className="text-xl font-bold">Order Details</h2>
              <UpdateOrderStatusButton orderData={order[0]} />
            </div>
            <p className="text-xs 2xl:text-sm text-slate-400">
              Order ID: {order[0].id}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">
                Customer Name
              </p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {order[0].customer_first_name} {order[0].customer_last_name}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">
                Contact Number
              </p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {order[0].customer_contact_number}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Email</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {order[0].customer_email}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">
                Payment Method
              </p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {order[0].payment_method}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Status</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {order[0].status}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Cashier</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {order[0].employees.first_name}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Created At</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                {format(new Date(order[0].created_at), "PPPP")}
              </p>
            </div>
          </div>
          <Separator className="bg-slate-400" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">
                Products Total
              </p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                ₱{" "}
                {order[0].purchase_products
                  .reduce(
                    (acc: any, item: any) => acc + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Parts Total</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                ₱{" "}
                {order[0].purchase_parts
                  .reduce(
                    (acc: any, item: any) => acc + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Tax</p>
              <p className="text-xs 2xl:text-sm text-slate-50">₱ 0</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">
                Discount ({order[0].discount}%)
              </p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                - ₱{" "}
                {(
                  (order[0].purchase_products.reduce(
                    (acc: any, item: any) => acc + item.price * item.quantity,
                    0
                  ) +
                    order[0].purchase_parts.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    )) *
                  (order[0].discount / 100)
                ).toFixed(2)}
              </p>
            </div>
          </div>

          <Separator className="bg-slate-400" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Total</p>
              <p className="text-md 2xl:text-lg text-slate-50 font-bold">
                ₱ {order[0].total_price.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Amount Paid</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                - ₱ {order[0].amount_paid.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs 2xl:text-sm text-slate-400">Change</p>
              <p className="text-xs 2xl:text-sm text-slate-50">
                ₱ {(order[0].amount_paid - order[0].total_price).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full flex flex-col place-items-center gap-4">
            <Barcode
              value={order[0].id ? order[0].id : "No Barcode"}
              displayValue={false}
              background="transparent"
              lineColor="white"
              width={1}
              height={70}
              margin={0}
              renderer="img"
            />
          </div>
        </div>
        <Button
          className="bg-applicationPrimary hover:bg-applicationPrimary/70 flex gap-1 shadow-lg"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          <MdOutlineReceiptLong />
          Print
        </Button>
      </div>
      <div style={{ display: "none" }}>
        <div
          className="w-full min-h-[600px] 2xl:min-h-[680px] flex flex-col place-items-center"
          ref={contentToPrint}
        >
          <div className="w-full flex flex-col gap-0.5 justify-center place-items-center py-2">
            <img src={recieptLogo.src} alt="logo" className="mb-2" />
            <p className="w-full text-center text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
              {`${order[0].inventory.branches.branch_location}`}
            </p>
            <p className="w-full text-center text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
              {`${order[0].inventory.branches.contact_number}`}
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-col justify-between gap-1">
              <h2 className="flex gap-1 place-items-center text-sm font-bold text-black space-mono-regular tracking-tighter">
                {/* <FiBox /> */}
                Order Details
              </h2>
              <p className="text-[8px] font-semibold text-black space-mono-regular tracking-tighter">
                {`ID: ${order[0].id}`}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Customer Name
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].customer_first_name} {order[0].customer_last_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Contact Number
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].customer_contact_number}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Email
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].customer_email}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Branch
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].inventory.branches.branch_name}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Payment Method
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].payment_method}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Status
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].status}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Cashier
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {order[0].employees.first_name}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Created At
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  {format(new Date(order[0].created_at), "P")}
                </p>
              </div>
            </div>
            <Separator className="bg-slate-400" />
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="flex gap-1 place-items-center text-[13px] font-semibold text-black space-mono-regular tracking-tighter">
                  {/* <BsBoxes /> */}
                  Purchased Products
                </p>
              </div>
              {order[0].purchase_products.map((item: any, index: number) => (
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
                  {order[0].purchase_products
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
                {order[0].purchase_parts.map((item: any, index: number) => (
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
                    {order[0].purchase_parts
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
                    order[0].purchase_products.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    ) +
                    order[0].purchase_parts.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
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
                  Discount ({order[0].discount}%)
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  - ₱{" "}
                  {(
                    (order[0].purchase_products.reduce(
                      (acc: any, item: any) => acc + item.price * item.quantity,
                      0
                    ) +
                      order[0].purchase_parts.reduce(
                        (acc: any, item: any) =>
                          acc + item.price * item.quantity,
                        0
                      )) *
                    (order[0].discount / 100)
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
                  ₱ {order[0].total_price.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Amount Paid
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  - ₱ {order[0].amount_paid.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  Change
                </p>
                <p className="text-[10px] font-semibold text-black space-mono-regular tracking-tighter">
                  ₱ {(order[0].amount_paid - order[0].total_price).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="w-full max-w-full flex flex-col place-items-center gap-4">
              <Barcode
                value={order[0].id ? order[0].id : "No Barcode"}
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
