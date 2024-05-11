import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  progress_entries: [],
};

const progressEntriesSlice = createSlice({
  name: "progressEntriesSlice",
  initialState: initialState,
  reducers: {
    setProgressEntries: (state, action: PayloadAction<any>) => {
      state.progress_entries = action.payload;
    },
  },
});

export const { setProgressEntries } = progressEntriesSlice.actions;
export default progressEntriesSlice.reducer;
