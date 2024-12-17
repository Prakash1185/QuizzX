import React from 'react'
import { Link } from 'react-router-dom'

const ShowQuestionBox = () => {
    return (
        <div className='bg-finalDark px-5 py-3 shadow-md rounded-md text-lg flex flex-col gap-2 w-full   border border-gray-500 border-opacity-50'>
            <div>
                <div className='flex items-center gap-1 bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-2 text-xl'>
                    <h1>1.</h1>
                    <h1>Question Name</h1>
                </div>
                <div className='flex flex-col gap-1.5 items-start mt-2'>
                    <button className='border border-gray-500 border-opacity-20 rounded-md bg-dark2 pl-4 py-2  w-full text-start'>Option 1</button>
                    <button className='border border-gray-500 border-opacity-20 rounded-md bg-dark2 py-2  pl-4 w-full text-start'>Option 2</button>
                    <button className='border border-gray-500 border-opacity-20 rounded-md bg-dark2 py-2  pl-4 w-full text-start'>Option 3</button>
                    <button className='border border-gray-500 border-opacity-20 rounded-md bg-dark2 py-2  pl-4 w-full text-start'>Option 4</button>
                </div>
                <h1 className='border border-gray-500 border-opacity-20 rounded-md bg-dark2 py-2  pl-4 w-full text-start mt-5'>Correct Option : </h1>
                <Link to={`/admin/quiz/:id/edit-question/:qnId`} >
                    <button className='font-inter bg-blue-600 text-white py-2 px-5 rounded-md w-full mt-5'>
                        Edit Question
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default ShowQuestionBox