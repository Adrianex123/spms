import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  currentOrderService: {},
};

const currentOrderServiceSlice = createSlice({
  name: "currentOrderServiceSlice",
  initialState: initialState,
  reducers: {
    setCurrentOrderService: (state, action: PayloadAction<any>) => {
      state.currentOrderService = action.payload;
    },
  },
});

export const { setCurrentOrderService } = currentOrderServiceSlice.actions;
export default currentOrderServiceSlice.reducer;
