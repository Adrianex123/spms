import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { DataTable as ProductsOptionsDataTable } from "./products-options/data-table";
import { DataTable as PartsOptionsDataTable } from "./parts-options/data-table";
import { DataTable as ServicesOptionsDataTable } from "./services-options/data-table";
import { initiateColumns as initiateProductsColumns } from "./products-options/columns";
import { initiateColumns as initiatePartsColumns } from "./parts-options/columns";
import { initiateColumns as initiateServicesColumns } from "./services-options/columns";
import { useSelector, useDispatch } from "react-redux";
import { FaHandsHelping } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

export default function OrderCartOptions({}: {}) {
  const productsOption = useSelector(
    (state: any) => state.orderCartOptionSlice.productsData
  );
  const partsOption = useSelector(
    (state: any) => state.orderCartOptionSlice.partsData
  );
  const servicesOption = useSelector(
    (state: any) => state.orderServiceCartOptionSlice.servicesData
  );

  const productsCart = useSelector(
    (state: any) => state.orderCart.productsCart
  );
  const partsCart = useSelector((state: any) => state.orderCart.partsCart);
  const servicesCart = useSelector(
    (state: any) => state.orderServiceCart.servicesCart
  );
  const dispatch = useDispatch();

  return (
    <Tabs
      defaultValue="services"
      className="w-full h-full flex max-w-[1840px] flex-col justify-center place-items-center gap-2"
    >
      <div className="w-full flex justify-between">
        <TabsList className="h-fit bg-darkBg border border-lightBorder rounded-lg gap-2">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-black/60
            data-[state=active]:text-black rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <FaCartPlus />
            Supplies
          </TabsTrigger>
          <TabsTrigger
            value="parts"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-black/80
            data-[state=active]:text-black rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <PiGearSixBold />
            Parts
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-black/80
            data-[state=active]:text-black rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <FaHandsHelping />
            Services
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="products"
        className="w-full h-full bg-darkBg border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <ProductsOptionsDataTable
          columns={initiateProductsColumns(dispatch, productsCart)}
          data={productsOption}
        />
      </TabsContent>
      <TabsContent
        value="parts"
        className="w-full h-full bg-darkBg border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <PartsOptionsDataTable
          columns={initiatePartsColumns(dispatch, partsCart)}
          data={partsOption}
        />
      </TabsContent>
      <TabsContent
        value="services"
        className="w-full h-full bg-darkBg border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <ServicesOptionsDataTable
          columns={initiateServicesColumns(dispatch, servicesCart)}
          data={servicesOption}
        />
      </TabsContent>
    </Tabs>
  );
}
