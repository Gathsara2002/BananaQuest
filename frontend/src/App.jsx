import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import SignInComponent from "./views/pages/signin/SignInComponent.jsx";
import LogInComponent from "./views/pages/login/LogInComponent.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/signin"
                       element={<SignInComponent/>}>
                </Route>
                <Route path="/login"
                       element={<LogInComponent/>}>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
