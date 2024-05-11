import { configureStore } from "@reduxjs/toolkit";
import currentEmployeeReducer from "./slices/employeeSlice";
import departmentsSlice from "./slices/departmentsSlice";
import uomsReducer from "./slices/uomsSlice";
import rolesReducer from "./slices/rolesSlice";
import brandsReducer from "./slices/brandsSlice";
import orderCartOptionSlice from "./slices/orderCartOptionSlice";
import orderCartSlice from "./slices/orderCartSlice";
import allEmployeesSlice from "./slices/allEmployeesSlice";
import currentOrderServiceSlice from "./slices/currentOrderServiceSlice";
import orderServiceCartOptionSlice from "./slices/orderServiceCartOptionSlice";
import orderServiceCartSlice from "./slices/orderServiceCartSlice";
import branchesSlice from "./slices/branchesSlice";
import viewOrderCartSlice from "./slices/viewOrderCartSlice";
import viewOrderServiceCartSlice from "./slices/viewOrderServiceCartSlice";
import progressEntriesSlice from "./slices/progressEntriesSlice";
import currentSessionSlice from "./slices/currentSessionSlice";
import allMobileUsersSlice from "./slices/mobileUsersSlice";

export const store = configureStore({
  reducer: {
    currentEmployee: currentEmployeeReducer,
    departments: departmentsSlice,
    uoms: uomsReducer,
    roles: rolesReducer,
    brands: brandsReducer,

    orderCartOptionSlice: orderCartOptionSlice,
    orderCart: orderCartSlice,
    branches: branchesSlice,

    orderServiceCartOptionSlice: orderServiceCartOptionSlice,

    orderServiceCart: orderServiceCartSlice,

    currentOrderService: currentOrderServiceSlice,
    viewOrderCart: viewOrderCartSlice,
    viewOrderServiceCart: viewOrderServiceCartSlice,
    progressEntries: progressEntriesSlice,

    currentSession: currentSessionSlice,
    allMobileUser: allMobileUsersSlice,
    allEmployees: allEmployeesSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
