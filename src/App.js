import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";

function App() {
    return <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;
