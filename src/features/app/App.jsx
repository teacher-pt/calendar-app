import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';

import './App.css'
import Calendar from '../calendar/Calendar'
import CurrentMonth from '../calendar/CurrentMonth';
import { selectCurrentMonthName, selectCurrentYear } from '../calendar/calendarSlice';

function App() {
    const monthName = useSelector(selectCurrentMonthName);
    const year = useSelector(selectCurrentYear);

    return (
        <>
            <h1>{monthName} {year}</h1>
            <Routes>
                <Route path="calendar/:month/:year" element={<Calendar />} />
                <Route path='*' element={<CurrentMonth />} />
            </Routes>
        </>
    );
}

export default App
