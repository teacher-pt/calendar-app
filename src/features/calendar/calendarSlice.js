import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../../logs/data";

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
    }
});

export const { addEvent, removeEvent } = calendarSlice.actions;
export default calendarSlice.reducer;