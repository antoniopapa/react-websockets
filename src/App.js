import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./pages/Chat";

function App() {
    return <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;
