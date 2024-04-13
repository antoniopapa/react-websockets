import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Outlet, useNavigate} from "react-router-dom";

const Secure = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('user')
                setUser(data)
            } catch (e) {
                await navigate('/login')
            }
        })()
    }, []);

    return <>
        <header className="d-flex justify-content-end py-3">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a className="nav-link active">{user?.first_name} {user?.last_name}</a>
                </li>
            </ul>
        </header>

        <Outlet/>
    </>
};

export default Secure;
