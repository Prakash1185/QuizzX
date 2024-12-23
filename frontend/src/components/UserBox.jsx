import React from 'react'

const UserBox = ({ Name, Score }) => {
    return (
        <div className='bg-finalDark border border-gray-500 w-full px-5 py-1.5 bg-opacity-20 flex items-center justify-around rounded-md text-lg'>
            <h1>{Name}</h1>
            <h1>{Score}</h1>
        </div>
    )
}

export default UserBox