import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    // creating a isLoggedIn state to check if the admin is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // getting token from localstorage to set isLoggedIn state true using useEffect
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    const value = { isLoggedIn, setIsLoggedIn }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;