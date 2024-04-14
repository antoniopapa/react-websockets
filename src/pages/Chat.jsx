import React, {useContext, useEffect, useState} from 'react';
import {socket} from "../index";
import axios from "axios";
import {Context} from "../components/Secure";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user] = useContext(Context);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages(messages => [...messages, msg])
        })

        return () => {
            socket.off('message')
        }
    }, []);

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
                return <div className="row pt-2" key={m}>
                    <div className="col-6">
                        <div className="alert d-inline-block alert-primary" role="alert">
                            {m}
                        </div>
                    </div>

                    <div className="col-6">

                    </div>
                </div>
            })}


            {/*<div className="row pt-2">*/}
            {/*    <div className="col-6">*/}

            {/*    </div>*/}

            {/*    <div className="col-6">*/}
            {/*        <div className="alert d-inline-block alert-success float-end" role="alert">*/}
            {/*            Hello there*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

        <form id="reply" className="p-3 w-100" onSubmit={submit}>
            <div className="input-group">
                <input className="form-control" placeholder="Write a message" onChange={e => setMessage(e.target.value)}/>
            </div>
        </form>
    </>
};

export default Chat;
