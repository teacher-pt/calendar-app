import "./Day.css"

export default function Day({ date = "2020-01-01", info = { hebrew: "", events: [] } }) {
    return (
        <div key={date} className="calendar__cell" data-date={date}>
            <div className="calendar__day-number">{new Date(date).getDate()}</div>
            <div className="calendar__hebrew">{info.hebrew}</div>
        </div>
    )
}
