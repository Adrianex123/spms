import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const brandsSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {
    setBrandsData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setBrandsData } = brandsSlice.actions;
export default brandsSlice.reducer;
