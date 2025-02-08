import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import SignInComponent from "./views/pages/SignInComponent.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/signin"
                       element={<SignInComponent/>}></Route>
            </Routes>
        </Router>
    )
}

export default App
