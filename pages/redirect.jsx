import { useEffect } from 'react'
import {ADMIN_URL} from '../config/url'

function Redirect() {
    useEffect(() => {
        const token = localStorage.getItem("adminKey");
        const url = `${ADMIN_URL}/?token=${token}`;
        window.location.href = url
    }, [])

    return <h5> Redirecting.... </h5>

}

export default Redirect