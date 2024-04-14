import React, {useContext, useEffect, useState} from 'react';
import {socket} from "../index";
import axios from "axios";
import {Context} from "../components/Secure";
import {useParams} from "react-router-dom";

const Chat = () => {
    const {id} = useParams();
    const [user] = useContext(Context);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`users/${id}/messages`)
            setMessages(data.messages)

            socket.on('message', (msg) => {
                setMessages(messages => [...messages, msg])
            })
        })()
        return () => {
            socket.off('message')
        }
    }, [id]);

    const submit = async (e) => {
        e.preventDefault()

        await axios.post('message', {
            message
        })

        setMessage('')
    }

    return <>
        <div id="head" className="py-3 lh-sm border-bottom">
            <strong className="mb-1">Members: John Doe, Jane Smith</strong>
        </div>

        <div id="conversation">
            {messages.map(m => {
                let html;

                if (m.type === "text") {
                    const cls = m.sender.id === user.id ? "alert-primary" : "alert-success float-end";
                    html = <div className={`alert d-inline-block ${cls}`} role="alert">
                        {m.content}
                    </div>
                } else {
                    html = <img src={m.content} alt="image" className="w-100"/>
                }

                return <div className="row pt-2" key={m.id}>
                    {m.receiver.id === user.id ?? <div className="col-6"/>}
                    <div className="col-6">{html}</div>
                    {m.sender.id === user.id ?? <div className="col-6"/>}
                </div>
            })}
        </div>

        <form id="reply" className="p-3 w-100" onSubmit={submit}>
            <div className="input-group">
                <input className="form-control" placeholder="Write a message" onChange={e => setMessage(e.target.value)}/>
            </div>
        </form>
    </>
};

export default Chat;
