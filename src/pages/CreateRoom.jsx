import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateRoom = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        members: []
    });
    const [users, setUsers] = useState([]);


    const updateMembers = (e) => {
        if (e.target.checked) {
            setFormData({
                ...formData,
                members: [...formData.members, e.target.value]
            })
        } else {
            setFormData({
                ...formData,
                members: formData.members.filter(m => m !== e.target.value)
            })
        }
    }

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('users');
            setUsers(data);
        })()
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        await axios.post('rooms', formData);
        navigate('/');
    }

    return <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Create Room</h1>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input className="form-control" id="title" placeholder="Title" name="title" defaultValue={formData.title}
                       onChange={e => setFormData({
                           ...formData,
                           title: e.target.value
                       })}
                />
            </div>

            <div className="mb-3">
                <p>Members</p>
                {users.map(u => {
                    return <div className="form-check" key={u}>
                        <input className="form-check-input" type="checkbox" name="members" id={`check${u.id}`} value={u.id}
                               onChange={updateMembers}
                        />
                        <label className="form-check-label" htmlFor={`check${u.id}`}>
                            {u.first_name} {u.last_name}
                        </label>
                    </div>
                })}
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
};

export default CreateRoom;
