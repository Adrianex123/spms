import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const departmentsSlice = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {
    setDepartmentsData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setDepartmentsData } = departmentsSlice.actions;
export default departmentsSlice.reducer;
