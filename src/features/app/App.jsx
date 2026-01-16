import { Route, Routes } from 'react-router';

import './App.css'
import Calendar from '../calendar/Calendar'
import CurrentMonth from '../calendar/CurrentMonth';

function App() {
    return (
        <>
            <h1>לוח השנה שלי</h1>
            <Routes>
                <Route path="calendar/:month/:year" element={<Calendar />} />
                <Route path='*' element={<CurrentMonth />} />
            </Routes>
        </>
    );
}

export default App
