import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  foodsuppliesData: [],
  equipmentsData: [],
  vehiclesData: [],
};

const requestCartOptions = createSlice({
  name: "requestOptions",
  initialState: initialState,
  reducers: {
    setFoodSuppliesData: (state, action: PayloadAction<any>) => {
      const foodsuppliesStock = action.payload.allFoodSupplies;
      // const foodsuppliesCart = action.payload.foodsuppliesCart;
      // // Update each stock_quantity of productsData on from productsCart

      // const updatedFoodSuppliesStock = foodsuppliesStock
      //   ? foodsuppliesStock.map((stockFoodSupply: any) => {
      //       const cartFoodSupply = foodsuppliesCart.find(
      //         (foodsupply: any) =>
      //           foodsupply.foodsupply_id === stockFoodSupply.id
      //       );
      //       if (cartFoodSupply) {
      //         return {
      //           ...stockFoodSupply,
      //           stock_quantity:
      //             stockFoodSupply.stock_quantity - cartFoodSupply.quantity,
      //         };
      //       }
      //       return stockFoodSupply;
      //     })
      //   : [];

      state.foodsuppliesData = foodsuppliesStock;
      console.log(state.foodsuppliesData);
    },
    setEquipmentsData: (state, action: PayloadAction<any>) => {
      const equipmentsStock = action.payload.equipmentsData;
      const equipmentsCart = action.payload.equipmentsCart;

      const updatedEquipmentsStock = equipmentsStock
        ? equipmentsStock.map((stockEquipment: any) => {
            const cartEquipment = equipmentsCart.find(
              (equipment: any) => equipment.equipment_id === stockEquipment.id
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

      state.equipmentsData = updatedEquipmentsStock;
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

export const { setFoodSuppliesData, setEquipmentsData, setVehiclesData } =
  requestCartOptions.actions;
export default requestCartOptions.reducer;
