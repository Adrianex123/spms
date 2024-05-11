import { DataTable as OrderServicesDataTable } from "./transactions-table/service-orders-table/data-table";
import { DataTable as OrdersDataTable } from "./transactions-table/orders-table/data-table";

import { initialState as initiateOrdersState } from "./transactions-table/orders-table/columns";
import { initialState as initiatePartsState } from "./transactions-table/service-orders-table/columns";

import {
  allPurchaseOrderServicesDisplay,
  allPurchaseOrdersDisplay,
} from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function InventoryContent({
  dataOrders,
  dataOrderService,
}: {
  dataOrders: allPurchaseOrdersDisplay[];
  dataOrderService: allPurchaseOrderServicesDisplay[];
}) {
  const branchesSlice = useSelector((state: any) => state.branches);

  return (
    <Tabs
      defaultValue="orders"
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-4"
    >
      <div className="w-full flex justify-between">
        <TabsList className="h-fit bg-darkComponentBg border border-lightBorder rounded-lg gap-2">
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/60
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <BsBoxSeam />
            Purchase Orders
          </TabsTrigger>
          <TabsTrigger
            value="order_service"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/80
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <PiGearSixBold />
            Purchase Services
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="orders" className="w-full h-full ">
        {/* Regular Orders Tab */}
        <OrdersDataTable
          columns={initiateOrdersState(branchesSlice)}
          data={dataOrders}
        />
      </TabsContent>
      <TabsContent value="order_service" className="w-full h-full ">
        {/* Service Order Tab */}
        <OrderServicesDataTable
          columns={initiatePartsState(branchesSlice)}
          data={dataOrderService}
        />
      </TabsContent>
    </Tabs>
  );
}
