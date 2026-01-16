import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../../../logs/data";
import axios from "axios";

const initialState = {
    days: data.hdates
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        addEvent(state, action) {
            const { date, event } = action.payload;
            state.days[date].events.push(event);
        },
        removeEvent(state, action) {
            const { date, eventIndex } = action.payload;
            state.days[date].events.splice(eventIndex, 1);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDates.fulfilled, (state, action) => {
                state.days = action.payload;
            })
            .addCase(fetchDates.rejected, (state, action) => {
                console.error("Failed to fetch dates:", action.error);
            });
    }
});

export const fetchDates = createAsyncThunk(
    "calendar/fetchDates",
    async ({ month, year }) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        const startDate = new Date(year, month - 1, 1);
        const formattedStartDate = startDate.toLocaleDateString('en-CA', options);

        const endDate = new Date(year, month, 0);
        const formattedEndDate = endDate.toLocaleDateString('en-CA', options);

        const hebcalApiUrl = `https://www.hebcal.com/converter?cfg=json&start=${formattedStartDate}&end=${formattedEndDate}&g2h=1`;
        const response = await axios.get(hebcalApiUrl);
        return response.data.hdates;
    }
);

export const { addEvent, removeEvent } = calendarSlice.actions;

export const selectCurrentMonthName = (state) => {
    const days = state.calendar && state.calendar.days ? state.calendar.days : {};
    const keys = Object.keys(days);
    if (keys.length === 0) {
        const now = new Date();
        return now.toLocaleString('he', { month: 'long' });
    }

    const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const chosenKey = keys.includes(todayKey) ? todayKey : keys.sort()[0];
    const entry = days[chosenKey];

    // Return the Gregorian month name derived from the YYYY-MM-DD key
    try {
        const dateObj = new Date(chosenKey);
        if (!Number.isNaN(dateObj.getTime())) {
            return dateObj.toLocaleString('he', { month: 'long' });
        }
    } catch (e) { }

    // Fallbacks: prefer Hebrew month if present, or generic locale fallback
    if (entry && entry.heDateParts && entry.heDateParts.m) return entry.heDateParts.m;
    if (entry && entry.hm) return entry.hm;

    return new Date().toLocaleString('he', { month: 'long' });
};

export const selectCurrentYear = (state) => {
    const days = state.calendar && state.calendar.days ? state.calendar.days : {};
    const keys = Object.keys(days);
    if (keys.length === 0) return new Date().getFullYear();

    const todayKey = new Date().toISOString().slice(0, 10);
    const chosenKey = keys.includes(todayKey) ? todayKey : keys.sort()[0];

    // Extract gregorian year from the YYYY-MM-DD key
    const gregYear = parseInt(chosenKey.slice(0, 4), 10);
    if (!Number.isNaN(gregYear)) return gregYear;

    // Fallback to current year
    return new Date().getFullYear();
};

export default calendarSlice.reducer;