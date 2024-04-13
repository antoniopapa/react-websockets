import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Context} from "../components/Secure";

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(Context);

    const submit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const inputs = Object.fromEntries(form.entries())
        const {data} = await axios.put('user', inputs)
        setUser(data)
        await navigate('/')
    }

    return <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please update your account</h1>

            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input className="form-control" id="first_name" placeholder="First Name" name="first_name" defaultValue={user?.first_name}/>
            </div>

            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input className="form-control" id="last_name" placeholder="Last Name" name="last_name" defaultValue={user?.last_name}/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" defaultValue={user?.email}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" type="password" className="form-control" name="password"/>
            </div>

            <div className="mb-3">
                <label htmlFor="password_confirm" className="form-label">Password Confirm</label>
                <input id="password_confirm" type="password" className="form-control" name="password_confirm"/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
};

export default Account;
