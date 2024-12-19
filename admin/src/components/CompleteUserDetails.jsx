import React from 'react'

const CompleteUserDetails = ({ name, score, date, id }) => {
    return (
        <div className='bg-finalDark border border-gray-500 w-full px-5 py-1.5 bg-opacity-20 flex gap-1  rounded-md text-sm flex-col'>
            <h1>Name : {name}</h1>
            <h1>Score : {score}</h1>
            <h1>Created : {date}</h1>
            {/* <h1>Quizzes Attempted : </h1> */}
            <div>
                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white mt-2 mb-1 transition-all duration-300 px-3 py-1 rounded-md'>Delete</button>
            </div>
        </div>
    )
}

export default CompleteUserDetails