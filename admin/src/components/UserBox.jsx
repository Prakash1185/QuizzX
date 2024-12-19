import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'

const UserBox = () => {
    return (
        <div className='bg-finalDark border border-gray-500 w-full px-5 py-2 bg-opacity-20 flex items-center justify-around rounded-md text-lg'>
            <div className='w-full'>
                <h1>Name</h1>
            </div>
            <div className='flex justify-between px-2 items-center gap-2 w-full'>
                <h1>Score</h1>
                <p><FaRegTrashCan className='bg-red-800 bg-opacity-20 text-red-300 cursor-pointer' /></p>
            </div>
        </div>
    )
}

export default UserBox