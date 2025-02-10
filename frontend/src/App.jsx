import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css'
import SignInComponent from "./views/pages/signin/SignInComponent.jsx";
import LogInComponent from "./views/pages/login/LogInComponent.jsx";
import PlayComponent from "./views/pages/play/PlayComponent.jsx";
import GameComponent from "./views/pages/game/GameComponent.jsx";
import WinComponent from "./views/pages/win/WinComponent.jsx";
import LostComponent from "./views/pages/lost/LostComponent.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signin" replace/>}/>
                <Route path="/signin"
                       element={<SignInComponent/>}>
                </Route>
                <Route path="/login"
                       element={<LogInComponent/>}>
                </Route>
                <Route path="/load"
                       element={<PlayComponent/>}>
                </Route>
                <Route path="/game"
                       element={<GameComponent/>}>
                </Route>
                <Route path="/win"
                       element={<WinComponent/>}>
                </Route>
                <Route path="/lost"
                       element={<LostComponent/>}>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
