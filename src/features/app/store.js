import { configureStore } from "@reduxjs/toolkit";
import calendarSlice, { fetchDates } from "../calendar/calendarSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice,
    },
});

const today = new Date();
const currentMonth = { month: today.getMonth(), year: today.getFullYear() };

store.dispatch(fetchDates(currentMonth));