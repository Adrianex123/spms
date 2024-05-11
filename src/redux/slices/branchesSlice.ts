import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const branchesSlice = createSlice({
  name: "branches",
  initialState: initialState,
  reducers: {
    setBranchesData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setBranchesData } = branchesSlice.actions;
export default branchesSlice.reducer;
