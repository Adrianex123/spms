import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const uomssSlice = createSlice({
  name: "uoms",
  initialState: initialState,
  reducers: {
    setUOMSData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setUOMSData } = uomssSlice.actions;
export default uomssSlice.reducer;
