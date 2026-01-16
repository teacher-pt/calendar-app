import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "../calendar/calendarSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice,
    },
});