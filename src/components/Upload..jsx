import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const Upload = () => {
    const {id} = useParams()
    const upload = async (files) => {
        if (files === null) return
        const file = files.item(0)

        const formData = new FormData()
        formData.append('image', file)
        formData.append('receiver_id', id)

        await axios.post('images', formData)
    }

    return <div className="input-group-prepend">
        <input type="file" className="d-none" id="inputFile" onChange={e => upload(e.target.files)}/>
        <label className="input-group-text" htmlFor="inputFile">Choose File</label>
    </div>
};

export default Upload;
