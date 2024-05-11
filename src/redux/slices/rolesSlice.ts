import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {
    setRolesData: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setRolesData } = rolesSlice.actions;
export default rolesSlice.reducer;
