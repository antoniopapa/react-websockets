import React from 'react';

const CreateRoom = () => {
    return <main className="form-signin w-100 m-auto">
        <form>
            <h1 className="h3 mb-3 fw-normal">Create Room</h1>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input className="form-control" id="title" placeholder="Title" name="title"/>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
};

export default CreateRoom;
