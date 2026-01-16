import { Route, Routes } from 'react-router';

import './App.css'
import Calendar from '../calendar/Calendar'
import CurrentMonth from '../calendar/CurrentMonth';
// import { useSelector } from 'react-redux';
// import { getMonthName } from '../calendar/calendarSlice';

function App() {
    // const { monthName: month } = useSelector(getMonthName());
    const fullYear = new Date().getFullYear();

    return (
        <>
            {/* <h1>חודש {month}/{fullYear}</h1> */}
            <Routes>
                <Route path="calendar/:month/:year" element={<Calendar />} />
                <Route path='*' element={<CurrentMonth />} />
            </Routes>
        </>
    );
}

export default App
