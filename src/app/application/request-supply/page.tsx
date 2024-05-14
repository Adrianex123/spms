/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import TransactionsContent from "./transactions-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useRequests } from "@/hooks/useOrders";
import { HomeIcon } from "lucide-react";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMainStocks } from "@/hooks/useMainStocks";
import { useFoodSupplies } from "@/hooks/useFoodSupplies";
import {
  setAllStocksData,
  setFoodSuppliesData,
  setVehiclesData,
} from "@/redux/slices/orderCartOptionSlice";
import { useVehicles } from "@/hooks/useVehicles";

export default function Transactions() {
  const dispatch = useDispatch();

  const { getRequests, requestsData } = useRequests();
  // const { getBranches, allBranchesData } = useBranches();
  // const { getProducts, productsData } = useProducts();
  const { getStocks, setStocksData } = useMainStocks();
  const { getFoodSupplies, allFoodSupplies } = useFoodSupplies();
  const { getVehicles, vehiclesData } = useVehicles();

  // const branchesData = allBranchesData.map((branch: any) => ({
  //   id: branch?.id,
  //   value: branch?.branch_name,
  //   label: branch?.branch_name,
  //   icon: HomeIcon,
  // }));

  const foodsuppliesCart = useSelector(
    (state: any) => state.requestCart.foodsuppliesCart
  );
  const stocksCart = useSelector((state: any) => state.requestCart.stocksCart);
  const vehiclesCart = useSelector(
    (state: any) => state.requestCart.vehiclesCart
  );

  // dispatch(setBranchesData(branchesData));

  dispatch(setFoodSuppliesData({ allFoodSupplies, foodsuppliesCart }));
  dispatch(setAllStocksData({ setStocksData, stocksCart }));
  dispatch(setVehiclesData({ vehiclesData, vehiclesCart }));

  // fetch all products
  useEffect(() => {
    const { error } = getRequests();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    // getBranches();
    getFoodSupplies();
    getStocks();
    getVehicles();
  }, []);

  // listen for changes in the database
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel1 = supabase
      .channel("stocks-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "request" },
        (payload: any) => {
          getRequests();
        }
      )
      .subscribe();
    const subscribedChannel2 = supabase
      .channel("products-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_supplies" },
        (payload: any) => {
          getFoodSupplies();
          getRequests();
        }
      )
      .subscribe();
    const subscribedChannel3 = supabase
      .channel("stocks-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "main_stocks" },
        (payload: any) => {
          getStocks();
          getRequests();
        }
      )
      .subscribe();
    const subscribedChannel4 = supabase
      .channel("vehicles-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicles" },
        (payload: any) => {
          getVehicles();
          getRequests();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
      supabase.removeChannel(subscribedChannel3);
      supabase.removeChannel(subscribedChannel4);
    };
  }, []);

  return (
    <div className="w-full flex justify-center py-3.5 no-scrollbar ">
      {/* {requestsData.length === 0 ? (
            <Loading />
          ) : ( */}
      <TransactionsContent dataRequests={requestsData} />
      {/* )} */}
    </div>
  );
}
