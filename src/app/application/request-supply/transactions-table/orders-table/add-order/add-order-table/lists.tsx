import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiWoodenCrate } from "react-icons/gi";
import { BsBoxSeam } from "react-icons/bs";
import { DataTable as FoodSuppliesOptionsDataTable } from "./products-options/data-table";
import { DataTable as EquipmentsOptionsDataTable } from "./parts-options/data-table";
import { DataTable as VehiclesOptionsDataTable } from "./vehicles-options/data-table";
import { initiateColumns as initiateFoodSuppliesColumns } from "./products-options/columns";
import { initiateColumns as initiateStocksCartColumns } from "./parts-options/columns";
import { initiateColumns as initiateVehiclesColumns } from "./vehicles-options/columns";
import { useSelector, useDispatch } from "react-redux";
import { FaAmbulance, FaToolbox } from "react-icons/fa";
import { Dispatch, UnknownAction } from "redux";

export default function RequestCartOptions({}: {}) {
  const foodsuppliesOption = useSelector(
    (state: any) => state.requestCartOptionSlice.foodsuppliesData
  );
  const equipmentsOption = useSelector(
    (state: any) => state.requestCartOptionSlice.allStocksData
  );
  const vehiclesOption = useSelector(
    (state: any) => state.requestCartOptionSlice.vehiclesData
  );

  const requestsCart = useSelector(
    (state: any) => state.requestCart.requestsCart
  );
  const stocksCart = useSelector((state: any) => state.requestCart.stocksCart);
  const vehiclesCart = useSelector(
    (state: any) => state.requestCart.vehiclesCart
  );

  const dispatch = useDispatch();

  return (
    <Tabs
      defaultValue="equipments"
      className="w-full h-full flex max-w-[1840px] flex-col justify-center place-items-center gap-2"
    >
      <div className="w-full flex justify-between">
        <TabsList className="h-fit bg-darkBg border border-lightBorder rounded-lg gap-2">
          <TabsTrigger
            value="foodsupplies"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/80
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <GiWoodenCrate />
            Supplies
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="foodsupplies"
        className="w-full h-full bg-darkBg border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <FoodSuppliesOptionsDataTable
          columns={initiateFoodSuppliesColumns(dispatch, requestsCart)}
          data={foodsuppliesOption}
        />
      </TabsContent>

      <TabsContent
        value="vehicles"
        className="w-full h-full bg-darkBg border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <VehiclesOptionsDataTable
          columns={initiateVehiclesColumns(dispatch, vehiclesCart)}
          data={vehiclesOption}
        />
      </TabsContent>
    </Tabs>
  );
}
