/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { allPurchaseOrderServicesDisplay } from "@/types";
import { MdOutlineMobileOff } from "react-icons/md";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { progress } from "@/app/application/transactions/transactions-table/service-orders-table/columns";
import { MdAddToPhotos } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { cn } from "@/lib/utils";
import UpdateProgressButton from "./update-progress/update-order-status-dialog";

export default function OrderContent({ orderService }: any) {
  const data: allPurchaseOrderServicesDisplay = orderService[0];

  const progress_entries = data.progress_entries
    .map((progress: any) => ({
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
    .reverse();

  return (
    <div className="w-full h-[788px] 2xl:h-[868px] flex max-w-[1840px] justify-center place-items-start gap-4">
      {/* <pre className="mt-2 w-[1340px] h-[600px] rounded-md bg-slate-950 p-4 overflow-y-scroll">
        <code className="text-white">
          {JSON.stringify(orderService, null, 2)}
        </code>
      </pre> */}
      <div className="w-full h-full flex gap-8">
        <div className="w-[40%] 2xl:w-[30%] flex flex-col gap-8">
          <div className="w-full h-full flex flex-col gap-6 bg-darkComponentBg rounded-xl border border-lightBorder p-4">
            <div className="w-full flex flex-col gap-6">
              <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                Customer Information
              </h3>
              <div className="w-full flex gap-3">
                <Avatar className="w-20 h-20 cursor-pointer rounded-lg shadow-2xl primary-glow transition-all duration-300 border-transparent hover:border-applicationPrimary">
                  <AvatarImage
                    src={data.mobile_user?.image_url}
                    className=" shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary"
                  />
                  <AvatarFallback className="text-black shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary">{`${data.customer_first_name[0]}${data.customer_last_name[0]}`}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  <h3 className="text-lg font-semibold text-slate-200 flex place-items-center gap-1 ">
                    <span>
                      {data.customer_first_name} {data.customer_last_name}{" "}
                    </span>
                    {data.mobile_user === null ? (
                      <MdOutlineMobileOff />
                    ) : (
                      <MdOutlineMobileFriendly />
                    )}
                  </h3>
                  <h3 className="text-sm font-semibold text-slate-400">
                    {data.customer_email}
                  </h3>
                  <h3 className="text-sm font-semibold text-slate-400">
                    {data.customer_contact_number}
                  </h3>
                </div>
              </div>
            </div>
            <Separator className="bg-lightBorder" />
            <div className="w-full h-full flex flex-col gap-3">
              <div className="w-full flex justify-between place-items-center">
                <h3 className="w-full text-sm font-semibold text-slate-200 ">
                  Order Timeline
                </h3>
                {progress_entries.length < 5 ? (
                  <UpdateProgressButton progress_entries={progress_entries} />
                ) : null}
              </div>
              <div
                className={cn(
                  "w-full h-full flex-col flex place-items-center",
                  data.progress_entries.length > 4
                    ? "justify-center"
                    : "justify-start"
                )}
              >
                <div className="w-full h-fit">
                  {progress_entries.map((progress: any, i: number) => (
                    <div
                      className={cn(
                        "relative pl-8 sm:pl-16 py-4 2xl:py-5 group",
                        progress.value === progress_entries[0].value
                          ? ""
                          : "opacity-30"
                      )}
                      key={i}
                    >
                      <div className="font-sm font-bold text-md text-white mb-1 sm:mb-0">
                        {progress.value}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[1.5rem] before:self-start before:-translate-x-1/2 before:-translate-y-2">
                        <div
                          className={cn(
                            "absolute left-2 sm:left-0 w-11 h-11 border-2 bg-applicationPrimary box-content rounded-full sm:ml-[1.5rem] -translate-x-1/2 -translate-y-2 flex justify-center place-items-center text-center transition-all duration-300",
                            progress.value === progress_entries[0].value
                              ? "animate-pulse-on-ping hover:scale-125"
                              : ""
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
            <div className="w-[55%] 2xl:w-[40%] h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
            <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
          </div>
          <div className="w-full h-[1300px] bg-darkComponentBg rounded-xl border border-lightBorder"></div>
        </div>
      </div>
    </div>
  );
}
