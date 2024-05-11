import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const currentSessionSlice = createSlice({
  name: "currentSession",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
});

export const { setCurrentUser } = currentSessionSlice.actions;
export default currentSessionSlice.reducer;
