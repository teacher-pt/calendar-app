import { useSelector } from "react-redux"

import "./Calendar.css"

const WEEKDAYS_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

export default function Calendar() {
    const days = useSelector((state) => state.calendar.days);

    return (
        <div className="calendar-wrapper" dir="rtl">
            <div className="calendar__header" aria-hidden>
                {WEEKDAYS_HE.map((w, i) => (
                    <div key={i} className="calendar__header-cell">
                        {w}
                    </div>
                ))}
            </div>

            <div className="calendar">
                {Object.entries(days).map(([date, info]) => (
                    <div key={date} className="calendar__cell" data-date={date}>
                        <div className="calendar__day-number">{new Date(date).getDate()}</div>
                        <div className="calendar__hebrew">{info.hebrew}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}