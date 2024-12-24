import React from 'react'

const UserBox = ({ Name, Score }) => {
    return (
        <div className=' bg-opacity-20 flex items-center justify-around rounded-md text-xl'>
            <h1 className="text-white">{Name}</h1>
            {/* <h1 className="text-white">{Score}</h1> */}
        </div>
    )
}

export default UserBox