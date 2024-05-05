import React, {useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

const Layout = () => {
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`rooms?name=${search}`)
            setRooms(data)
        })()
    }, [search]);

    return <div className="row">
        <div className="col-3 vh-100">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="form-control" placeholder="Search..." onChange={e => setSearch(e.target.value)}/>
                </div>

                <div className="list-group list-group-flush border-bottom scrollarea">
                    {rooms.map(r => {
                        return <Link to={`/rooms/${r.id}`} className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true" key={r}>
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{r.title}</strong>
                                <small></small>
                            </div>
                            <div className="col-10 mb-1 small"></div>
                        </Link>
                    })}

                    <Link to={'rooms/create'} className="btn btn-primary my-2">Create Room</Link>
                </div>
            </div>
        </div>

        <div className="col-9 border">
            <Outlet/>
        </div>
    </div>
};

export default Layout;
