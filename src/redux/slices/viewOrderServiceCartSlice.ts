import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  servicesCart: [],
};

const viewOrderServiceCart = createSlice({
  name: "viewOrderServiceCart",
  initialState: initialState,
  reducers: {
    setServiceCart: (state, action: PayloadAction<any>) => {
      state.servicesCart = action.payload;
      console.log(state.servicesCart);
    },
    addServiceToCart: (state, action: PayloadAction<any>) => {
      state.servicesCart.push(action.payload);
    },
    removeServiceFromCart: (state, action: PayloadAction<any>) => {
      state.servicesCart = state.servicesCart.filter(
        (service: any) => service.id !== action.payload
      );
    },
    updateServicePriceFromCart: (state, action: PayloadAction<any>) => {
      state.servicesCart = state.servicesCart.map((service: any) => {
        if (service.id === action.payload.id) {
          service.price = action.payload.price;
        }
        return service;
      });
    },
    resetOrderServiceCart: (state) => {
      state.servicesCart = [];
    },
  },
});

export const {
  setServiceCart,
  addServiceToCart,
  removeServiceFromCart,
  updateServicePriceFromCart,
  resetOrderServiceCart,
} = viewOrderServiceCart.actions;
export default viewOrderServiceCart.reducer;
