import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const usestocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    setStocksData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setStocksData } = usestocksSlice.actions;
export default usestocksSlice.reducer;
