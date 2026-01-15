import { useDispatch } from "react-redux";

import "./Day.css"
import { addEvent } from "./calendarSlice";

export default function Day({ date = "2020-01-01", info = { hebrew: "", events: [] } }) {
    const dispatch = useDispatch();

    const showEvents = () => {
        alert(`${info.events?.join('\n') || 'אין אירועים'}`);
    };

    const onAddEvent = () => {
        const eventName = prompt("הכנס שם אירוע:");
        if (eventName) {
            dispatch(addEvent({ date, event: eventName }));
        }
    };

    return (
        <div key={date} className="calendar__cell" data-date={date}>
            <div className="calendar__day-number">{new Date(date).getDate()}</div>
            <div className="calendar__hebrew">{info.hebrew}</div>
            {info.events && (<>
                <div className="calendar__events-count" title="הצג רשימת אירועים" onClick={showEvents}>
                    {info.events.length} אירועים
                </div>
                <div className="calendar__add-event">
                    <button onClick={onAddEvent}>הוסף אירוע</button>
                </div>
            </>)}
        </div>
    )
}
