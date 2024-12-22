import { createContext, useState } from "react";
import { handleSuccess, handleError } from '../components/ToastMessages';

export const UserContext = createContext()

const UserContextProvider = (props) => {

    const [isAccountCreated, setIsAccountCreated] = useState(false)

    const BackendURL = import.meta.env.VITE_BACKEND_URL






    const value = { BackendURL , isAccountCreated, setIsAccountCreated }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserContextProvider;