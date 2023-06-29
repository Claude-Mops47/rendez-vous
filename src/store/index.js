import { configureStore } from "@reduxjs/toolkit";

import { alertReducer } from "./alertSlice";
import { authReducer } from "./authSlice";
import { appointmentsReducer } from "./appointmentSlice";

export * from "./alertSlice";
export * from "./authSlice";
export * from "./appointmentSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    appointments: appointmentsReducer,
  },
  devTools: true,
});
