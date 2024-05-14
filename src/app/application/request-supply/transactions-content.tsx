import { DataTable as RequestVehiclesDataTable } from "./transactions-table/service-orders-table/data-table";
import { DataTable as RequestsDataTable } from "./transactions-table/orders-table/data-table";

import { initialState as initiateRequestsState } from "./transactions-table/orders-table/columns";
import { initialState as initiateEquipmentsState } from "./transactions-table/service-orders-table/columns";

import { allPurchaseRequestsDisplay } from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsFillEnvelopeArrowUpFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function InventoryContent({
  dataRequests,
}: {
  dataRequests: allPurchaseRequestsDisplay[];
}) {
  const branchesSlice = useSelector((state: any) => state.branches);

  // function initiateVehiclesState(
  //   branchesSlice: any
  // ): import("@tanstack/table-core").ColumnDef<never, unknown>[] {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <Tabs
      defaultValue="requests"
      className="w-full flex max-w-[1580px] flex-col justify-center place-items-center"
    >
      <div className="w-full">
        <TabsList className="h-fit rounded-lg bg-white">
          <TabsTrigger
            value="requests"
            className="data-[state=active]:bg- data-[state=inactive]:hover:bg-/80
            data-[state=inactive]:hover:text-slate-500
            data-[state=active]:text-black rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <p className="font-bold text-2xl"> Requests</p>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="requests" className="w-full h-full ">
        <RequestsDataTable
          columns={initiateRequestsState(branchesSlice)}
          data={dataRequests}
        />
      </TabsContent>
    </Tabs>
  );
}
