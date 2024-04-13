import React from 'react';
import axios from "axios";

const Register = () => {

    const submit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const inputs = Object.fromEntries(form.entries())
        await axios.post('http://localhost:8000/api/register', inputs)
    }

    return <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>

            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input className="form-control" id="first_name" placeholder="First Name" name="first_name"/>
            </div>

            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input className="form-control" id="last_name" placeholder="Last Name" name="last_name"/>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email"/>
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

export default Register;
