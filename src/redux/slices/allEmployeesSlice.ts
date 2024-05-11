import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  allEmployees: [],
  allMechanics: [],
  allSupervisors: [],
};

const allEmployeesSlice = createSlice({
  name: "allEmployees",
  initialState: initialState,
  reducers: {
    setEmployeesData: (state, action: PayloadAction<any>) => {
      state.allEmployees = action.payload;
    },
    setMechanicsData: (state, action: PayloadAction<any>) => {
      state.allMechanics = action.payload.filter(
        (employee: any) => employee.roles.role === "Mechanic"
      );
    },
    setSuperVisorsData: (state, action: PayloadAction<any>) => {
      state.allSupervisors = action.payload.filter(
        (employee: any) => employee.roles.role === "Supervisor"
      );
    },
  },
});

export const { setEmployeesData, setMechanicsData, setSuperVisorsData } =
  allEmployeesSlice.actions;
export default allEmployeesSlice.reducer;
