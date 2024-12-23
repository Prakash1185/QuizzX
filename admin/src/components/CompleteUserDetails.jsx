import React from 'react'
import { handleError, handleSuccess } from './ToastMessages'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react'

const CompleteUserDetails = ({ name, score, date, id, time, getAllUsers, quizzesAttempted }) => {

    const { BackendURL } = useContext(AdminContext)

    const handleUserDelete = async () => {
        try {
            const response = await fetch(`${BackendURL}/user/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            const result = await response.json()
            const { success, message } = result

            if (success) {
                handleSuccess(message)
                getAllUsers()
            }

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className='bg-finalDark border border-gray-500 w-full px-5 py-1.5 bg-opacity-20 flex gap-1  rounded-md text-sm flex-col'>
            <h1>Name : {name}</h1>
            <h1>Score : {score}</h1>
            <h1>Created : {date} , {time}</h1>
            <h1>Quizzes Attempted : {quizzesAttempted}</h1>
            <div>
                <button onClick={() => handleUserDelete(id)} className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white mt-2 mb-1 transition-all duration-300 px-3 py-1 rounded-md'>Delete</button>
            </div>
        </div>
    )
}

export default CompleteUserDetails