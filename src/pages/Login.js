import React from 'react';
import axios from "axios";

const Login = () => {
    const submit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const inputs = Object.fromEntries(form.entries())
        await axios.post('login', inputs)
    }

    return <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Login</h1>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email"/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" type="password" className="form-control" name="password"/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
};

export default Login;
