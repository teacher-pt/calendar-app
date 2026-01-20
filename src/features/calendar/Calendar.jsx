import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";

import "./Calendar.css"
import Day from "./Day";
import { fetchDates } from "./calendarSlice";

const WEEKDAYS_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

export default function Calendar() {
    const { month, year } = useParams();

    const days = useSelector((state) => state.calendar.days);
    const dispatch = useDispatch();
    const [daysToShow, setDaysToShow] = useState([]);

    useEffect(() => {
        const currentMonth = { month: +month, year: +year };
        dispatch(fetchDates(currentMonth));
    }, [dispatch, month, year]);

    useLayoutEffect(() => {
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

    function formatDateMY(deltaMonth = 0) {
        const date = new Date(+year, +month + deltaMonth - 1);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    return (
        <div className="calendar-wrapper" dir="rtl">
            <Link
                className="calendar-nav calendar-nav--prev"
                aria-label="חודש קודם"
                to={`/calendar/${formatDateMY(-1)}`}>
                ‹
            </Link>
            <Link
                className="calendar-nav calendar-nav--next"
                aria-label="חודש הבא"
                to={`/calendar/${formatDateMY(1)}`}>
                ›
            </Link>
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