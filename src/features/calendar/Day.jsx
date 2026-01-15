import "./Day.css"

export default function Day({ date = "2020-01-01", info = { hebrew: "", events: [] } }) {
    const showEvents = () => {
        alert(`${info.events?.join('\n') || 'אין אירועים'}`);
    };

    return (
        <div key={date} className="calendar__cell" data-date={date}>
            <div className="calendar__day-number">{new Date(date).getDate()}</div>
            <div className="calendar__hebrew">{info.hebrew}</div>
            <div className="calendar__events-count" title="הצג רשימת אירועים" onClick={showEvents}>
                {info.events && `${info.events.length} אירועים`}
            </div>
        </div>
    )
}
