import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {socket} from "./index";

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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

        await axios.post('http://localhost:8000/api/message', {
            message
        })

        setMessage('')
    }

    return <div className="container">
        <div className="row">
            <div className="col-3 vh-100">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        <a href="#" className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">John Doe</strong>
                                <small>Wed</small>
                            </div>
                            <div className="col-10 mb-1 small">Last message</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-9 border">

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

            </div>
        </div>
    </div>
}

export default App;
