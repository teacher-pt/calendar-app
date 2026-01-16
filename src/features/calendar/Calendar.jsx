import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./Calendar.css"
import Day from "./Day";
import { fetchDates } from "./calendarSlice";

const WEEKDAYS_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

export default function Calendar() {
    const { month, year } = useParams();

    const days = useSelector((state) => state.calendar.days);
    // const monthName = useSelector((state) => state.calendar.monthName);
    const dispatch = useDispatch();
    const [daysToShow, setDaysToShow] = useState([]);

    useEffect(() => {
        const currentMonth = { month: +month, year: +year };
        dispatch(fetchDates(currentMonth));
    }, [dispatch, month, year]);

    useEffect(() => {
        const dates = Object.keys(days);

        const firstDate = new Date(dates[0]);
        const firstDay = firstDate.getDay();

        const prevMonth = [];
        for (let i = 0; i < firstDay; i++) {
            firstDate.setDate(firstDate.getDate() - 1);
            const key = firstDate.toDateString();
            prevMonth.unshift([key, { hebrew: "" }]);
        }

        const lastDate = new Date(dates[dates.length - 1]);
        const lastDay = lastDate.getDay();
        const nextMonth = [];
        for (let i = 0; i < 6 - lastDay; i++) {
            lastDate.setDate(lastDate.getDate() + 1);
            const key = lastDate.toDateString();
            nextMonth.push([key, { hebrew: "" }]);
        }

        setDaysToShow([...prevMonth, ...Object.entries(days), ...nextMonth]);
    }, [days]);

    return (
        <div className="calendar-wrapper" dir="rtl">
            {/* {monthName} */}
            <div className="calendar__header" aria-hidden>
                {WEEKDAYS_HE.map((w, i) => (
                    <div key={i} className="calendar__header-cell">
                        {w}
                    </div>
                ))}
            </div>

            <div className="calendar">
                {daysToShow.map(([date, info]) => (<Day key={date} date={date} info={info} />))}
            </div>
        </div>
    )
}