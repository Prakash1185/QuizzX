import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            if (
                location.pathname === "/" ||
                location.pathname === "/admin/login") {
                navigate("/admin/home", { replace: false });
            }
        }
    }, [location, navigate, setIsLoggedIn]);
    return null;
}

export default RefreshHandler;