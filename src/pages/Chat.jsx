import React, {useContext, useEffect, useState} from 'react';
import {socket} from "../index";
import axios from "axios";
import {Context} from "../components/Secure";
import {useParams} from "react-router-dom";
import Upload from "../components/Upload.";

const Chat = () => {
    const {id} = useParams();
    const [user] = useContext(Context);
    const [room, setRoom] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false);

    const load = async () => {
        const {data} = await axios.get(`rooms/${id}/messages?page=${page}`)
        setRoom(data.room);
        setMessages(page === 1 ? data.messages : [...data.messages, ...messages])
        setLastPage(data.messages.length === 0)
    }

    useEffect(() => {
        setPage(1)
        load()

        socket.on('message', (msg, rm) => {
            if (room.id === rm.id) {
                setMessages(messages => [...messages, msg])
            }
        })

        return () => {
            socket.off('message')
        }
    }, [id]);

    useEffect(() => {
        load()
    }, [page])

    const submit = async (e) => {
        e.preventDefault()

        await axios.post(`rooms/${id}/messages`, {
            content: message
        })

        setMessage('')
    }

    return <>
        <div id="head" className="py-3 lh-sm border-bottom">
            <strong className="mb-1">Members: {room.members?.map(m => m.first_name + ' ' + m.last_name).join(', ')}</strong>
        </div>

        <div id="conversation">
            {!lastPage && <div className="text-center py-1">
                <a href="#" className="alert-link" onClick={() => setPage(page + 1)}>Load more recent</a>
            </div>}

            {messages.map(m => {
                let html;

                if (m.type === "text") {
                    const cls = m.sender.id === user?.id ? "alert-primary float-end" : "alert-success";
                    html = <div className={`alert d-inline-block ${cls}`} role="alert">
                        {m.content}
                    </div>
                } else {
                    html = <img src={m.content} alt="image" className="w-100"/>
                }

                return <div className="row pt-2" key={m.id}>
                    {m.sender?.id === user?.id ? <div className="col-6"/> : null}
                    <div className="col-6">{html}</div>
                    {m.sender?.id !== user?.id ? <div className="col-6"/> : null}
                </div>
            })}
        </div>

        <form id="reply" className="p-3 w-100" onSubmit={submit}>
            <div className="input-group">
                <Upload/>

                <input className="form-control" placeholder="Write a message" onChange={e => setMessage(e.target.value)}/>
            </div>
        </form>
    </>
};

export default Chat;
