import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import SignInComponent from "./views/pages/signin/SignInComponent.jsx";
import LogInComponent from "./views/pages/login/LogInComponent.jsx";
import PlayComponent from "./views/pages/play/PlayComponent.jsx";

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
                <Route path="/play"
                       element={<PlayComponent/>}>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
