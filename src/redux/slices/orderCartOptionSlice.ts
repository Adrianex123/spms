import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  foodsuppliesData: [],
  allStocksData: [],
  vehiclesData: [],
};

const requestCartOptions = createSlice({
  name: "requestOptions",
  initialState: initialState,
  reducers: {
    setFoodSuppliesData: (state, action: PayloadAction<any>) => {
      const foodsuppliesStock = action.payload.allFoodSupplies;
      state.foodsuppliesData = foodsuppliesStock;
      console.log(state.foodsuppliesData);
      const foodsuppliesCart = action.payload.foodsuppliesCart;
      // Update each stock_quantity of productsData on from productsCart

      const updatedFoodSuppliesStock = foodsuppliesStock
        ? foodsuppliesStock.map((stockFoodSupply: any) => {
            const cartFoodSupply = foodsuppliesCart.find(
              (foodsupply: any) =>
                foodsupply.foodsupply_id === stockFoodSupply.id
            );
            if (cartFoodSupply) {
              return {
                ...stockFoodSupply,
                stock_quantity:
                  stockFoodSupply.stock_quantity - cartFoodSupply.quantity,
              };
            }
            return stockFoodSupply;
          })
        : [];
      state.setFoodSuppliesData = updatedFoodSuppliesStock;
    },
    setAllStocksData: (state, action: PayloadAction<any>) => {
      const supplyStock = action.payload.allStocksData;
      const stocksCart = action.payload.stocksCart;

      const updatedEquipmentsStock = supplyStock
        ? supplyStock.map((stockEquipment: any) => {
            const cartEquipment = stocksCart.find(
              (equipment: any) => equipment.stocks === stockEquipment.id
            );
            if (cartEquipment) {
              return {
                ...stockEquipment,
                stock_quantity:
                  stockEquipment.stock_quantity - cartEquipment.quantity,
              };
            }
            return stockEquipment;
          })
        : [];

      state.allStocksData = updatedEquipmentsStock;
    },
    setVehiclesData: (state, action: PayloadAction<any>) => {
      const vehiclesStock = action.payload.vehiclesData;
      // const vehiclesCart = action.payload.vehiclesCart;

      // const updatedVehiclesStock = vehiclesStock
      //   ? vehiclesStock.map((stockVehicle: any) => {
      //       const cartVehicle = vehiclesCart.find(
      //         (vehicle: any) => vehicle.vehicle_id === stockVehicle.id
      //       );
      //       if (cartVehicle) {
      //         return {
      //           ...stockVehicle,
      //           stock_quantity:
      //             stockVehicle.stock_quantity - cartVehicle.quantity,
      //         };
      //       }
      //       return stockVehicle;
      //     })
      //   : [];

      state.vehiclesData = vehiclesStock;
    },
  },
});

export const { setFoodSuppliesData, setAllStocksData, setVehiclesData } =
  requestCartOptions.actions;
export default requestCartOptions.reducer;
