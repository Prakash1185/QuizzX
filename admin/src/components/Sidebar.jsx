import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(AdminContext)

    return (

        <>
            <div className='min-h-screen bg-dark2 border-r border-gray-500 border-opacity-50 text-lg font-medium hidden sm:block '>
                <ul className='text-gray-200 mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 sm:min-w-52 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''}`} to={"/admin/home"}>
                        <p>Home</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 md:px-9 sm:min-w-52  md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''}`} to={"/admin/all-quizzes"}>
                        <p>All Quizzes</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 md:px-9 sm:min-w-52  md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''}`} to={"/admin/create-quiz"}>
                        <p>Create Quiz</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 md:px-9 sm:min-w-52  md:min-w-72 cursor-pointer ${isActive ? 'bg-Ngreen bg-opacity-80' : ''}`} to={"/admin/users-list"}>
                        <p>Users</p>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}

export default Sidebar