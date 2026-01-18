import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";;
import axios from "axios";

const initialState = {
    days: { },
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

export default calendarSlice.reducer;