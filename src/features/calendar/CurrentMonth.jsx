import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function CurrentMonth() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/calendar/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
    }, [navigate]);

    return (
        <div>CurrentMonth</div>
    )
}
