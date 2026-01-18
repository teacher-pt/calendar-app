import { createSelector } from "@reduxjs/toolkit";

const days = (state) => state.calendar.days || {};

export const firstDay = createSelector([days], (days) => Object.keys(days).sort()[0]);

export const currentMonthName = createSelector(
    [firstDay],
    (firstDay) => firstDay ? new Date(firstDay).toLocaleString('he', { month: 'long' }) : ''
);

export const currentYear = createSelector(
    [firstDay],
    (firstDay) => firstDay ? new Date(firstDay).getFullYear() : new Date().getFullYear()
);