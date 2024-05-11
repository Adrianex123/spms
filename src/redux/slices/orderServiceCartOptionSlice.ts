import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  servicesData: [],
};

const orderServiceCartOptions = createSlice({
  name: "orderServiceOptions",
  initialState: initialState,
  reducers: {
    setServicesData: (state, action: PayloadAction<any>) => {
      const servicesStock = action.payload.servicesData;
      const updatedServicesStock = servicesStock
        ? servicesStock.map((stockService: any) => {
            return stockService;
          })
        : [];

      state.servicesData = updatedServicesStock;
    },
    reset(state) {
      state.servicesData = [];
    },
  },
});

export const { setServicesData } = orderServiceCartOptions.actions;
export default orderServiceCartOptions.reducer;
