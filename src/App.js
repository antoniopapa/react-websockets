import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Secure from "./components/Secure";
import Account from "./pages/Account";

function App() {
    return <div className="container">
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Secure />}>
                    <Route path="/" element={<Chat/>}/>
                    <Route path="/account" element={<Account/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App;
