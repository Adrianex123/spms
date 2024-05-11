import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

const currentEmployeeSlice = createSlice({
  name: "currentEmployee",
  initialState: initialState,
  reducers: {
    setEmployeeData: (state, action: PayloadAction<any>) => {
      state.employeeData = action.payload;
    },
  },
});

export const { setEmployeeData } = currentEmployeeSlice.actions;
export default currentEmployeeSlice.reducer;
