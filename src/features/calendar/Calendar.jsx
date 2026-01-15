import { useSelector } from "react-redux"

import "./Calendar.css"

export default function Calendar() {
    const days = useSelector((state) => state.calendar.days);

    return (
        <div>
            {Object.entries(days).map(([date, info]) => (
                <div key={date}>
                    {info.heDateParts.d}
                    {/* <div>{JSON.stringify(info, 4)}</div> */}
                </div>
            ))}
        </div>
    )
}