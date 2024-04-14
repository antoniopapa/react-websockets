import React, {useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

const Layout = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`users?name=${search}`)
            setUsers(data)
        })()
    }, [search]);

    return <div className="row">
        <div className="col-3 vh-100">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="form-control" placeholder="Search..." onChange={e => setSearch(e.target.value)}/>
                </div>

                <div className="list-group list-group-flush border-bottom scrollarea">
                    {users.map(u => {
                        return <Link to={`/users/${u.id}`} className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true" key={u}>
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{u.first_name} {u.last_name}</strong>
                                <small></small>
                            </div>
                            <div className="col-10 mb-1 small"></div>
                        </Link>
                    })}
                </div>
            </div>
        </div>

        <div className="col-9 border">
            <Outlet/>
        </div>
    </div>
};

export default Layout;
