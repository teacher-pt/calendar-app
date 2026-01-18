import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';

import './App.css'
import Calendar from '../calendar/Calendar'
import CurrentMonth from '../calendar/CurrentMonth';

function App() {
    const days = useSelector((state) => state.calendar.days);

    const firstDay = Object.keys(days).sort()[0];
    const monthName = firstDay ? new Date(firstDay).toLocaleString('he', { month: 'long' }) : '';
    const year = firstDay ? new Date(firstDay).getFullYear() : new Date().getFullYear();

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
