import React from 'react'
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <>
            <div className='min-h-screen bg-white border-r border text-lg font-medium hidden sm:block '>
                <ul className='text-[#312f2f] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 sm:min-w-52 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-dark bg-opacity-10 border-r-4 border-dark' : ''}`} to={"/admin/home"}>
                        <p>Home</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 md:px-9 sm:min-w-52  md:min-w-72 cursor-pointer ${isActive ? 'bg-dark bg-opacity-10  border-r-4 border-dark' : ''}`} to={"/admin/all-quizzes"}>
                        <p>All Quizzes</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 md:px-9 sm:min-w-52  md:min-w-72 cursor-pointer ${isActive ? 'bg-dark bg-opacity-10 ] border-r-4 border-dark' : ''}`} to={"/admin/create-quiz"}>
                        <p>Create Quiz</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5
           px-3 md:px-9 sm:min-w-52  md:min-w-72 cursor-pointer ${isActive ? 'bg-dark bg-opacity-10  border-r-4 border-dark' : ''}`} to={"/admin/users-list"}>
                        <p>Users</p>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}

export default Sidebar