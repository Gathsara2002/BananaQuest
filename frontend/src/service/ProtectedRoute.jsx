import {Navigate} from "react-router-dom";

const ProtectRoute = ({children}) => {
    const isAuthenticated = Boolean(localStorage.getItem("banana_userId"));
    return isAuthenticated ? children : <Navigate to="/login" replace/>
};

export default ProtectRoute;