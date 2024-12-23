import React, { useContext } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from './ToastMessages'

const UserBox = ({ Name, Score, id, getLeaderboard }) => {

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
                getLeaderboard()
            }

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className='bg-finalDark border border-gray-500 w-full px-5 py-2 bg-opacity-20 flex items-center justify-around rounded-md text-lg'>
            <div className='w-full'>
                <h1>{Name}</h1>
            </div>
            <div className='flex justify-between px-2 items-center gap-2 w-full'>
                <h1>{Score}</h1>
                <button onClick={() => handleUserDelete(id)}><FaRegTrashCan className='bg-red-800 bg-opacity-20 text-red-300 cursor-pointer' /></button>
            </div>
        </div>
    )
}

export default UserBox