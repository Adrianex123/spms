import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  allMobileUser: [],
};

const allMobileUsersSlice = createSlice({
  name: "allMobileUser",
  initialState: initialState,
  reducers: {
    setMobileUsersData: (state, action: PayloadAction<any>) => {
      state.allMobileUser = action.payload;
    },
  },
});

export const { setMobileUsersData } = allMobileUsersSlice.actions;
export default allMobileUsersSlice.reducer;
