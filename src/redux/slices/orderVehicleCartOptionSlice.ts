import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  vehiclesData: [],
};

const requestVehicleCartOptions = createSlice({
  name: "requestVehicleOptions",
  initialState: initialState,
  reducers: {
    setVehiclesData: (state, action: PayloadAction<any>) => {
      const vehiclesStock = action.payload.vehiclesData;
      const updatedVehiclesStock = vehiclesStock
        ? vehiclesStock.map((stockVehicle: any) => {
            return stockVehicle;
          })
        : [];

      state.vehiclesData = updatedVehiclesStock;
    },
    reset(state) {
      state.vehiclesData = [];
    },
  },
});

export const { setVehiclesData } = requestVehicleCartOptions.actions;
export default requestVehicleCartOptions.reducer;
