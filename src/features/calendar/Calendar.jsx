import { useSelector } from "react-redux"

import "./Calendar.css"

export default function Calendar() {
    const days = useSelector((state) => state.calendar.days);

    return (
        <div className="calendar">
            {Object.entries(days).map(([date, info]) => (
                <div key={date} className="calendar__cell" data-date={date}>
                    <div className="calendar__day-number">{new Date(date).getDate()}</div>
                    <div className="calendar__day-number">{info.hebrew}</div>
                </div>
            ))}
        </div>
    )
}