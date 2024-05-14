import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  VehiclesCart: [],
};

const requestvehicleCart = createSlice({
  name: "requestvehicleCart",
  initialState: initialState,
  reducers: {
    addvehicleToCart: (state, action: PayloadAction<any>) => {
      state.VehiclesCart.push(action.payload);
    },
    removevehicleFromCart: (state, action: PayloadAction<any>) => {
      state.VehiclesCart = state.VehiclesCart.filter(
        (vehicle: any) => vehicle.id !== action.payload
      );
    },
    updatevehiclePriceFromCart: (state, action: PayloadAction<any>) => {
      state.VehiclesCart = state.VehiclesCart.map((vehicle: any) => {
        if (vehicle.id === action.payload.id) {
          vehicle.price = action.payload.price;
        }
        return vehicle;
      });
    },
    resetRequestvehicleCart: (state) => {
      state.VehiclesCart = [];
    },
  },
});

export const {
  addvehicleToCart,
  removevehicleFromCart,
  updatevehiclePriceFromCart,
  resetRequestvehicleCart,
} = requestvehicleCart.actions;
export default requestvehicleCart.reducer;
