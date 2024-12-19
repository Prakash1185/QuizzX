import React from 'react'
import UserBox from '../components/UserBox'
import { Link } from 'react-router-dom'

const LeaderboardPage = () => {
    return (
        <div className='mx-10 py-5'>
            <div className='flex items-center gap-5'>
                <Link to={`/admin/all-quizzes`}>
                    <button className='font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20'>
                        Back
                    </button>
                </Link>
                <h1 className='text-2xl font-medium'>Leaderboard </h1>
            </div>
            <div className='flex flex-col gap-5 mt-5 w-[40rem] max-h-[calc(100vh-12rem)] overflow-y-auto'>
                <UserBox />
            </div>
        </div>
    )
}

export default LeaderboardPage