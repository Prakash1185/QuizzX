import React from 'react'
import { GoToHomeButton } from '../components/Buttons'
import UserBox from '../components/UserBox'
import { Link } from 'react-router-dom'

const LeaderboardPage = () => {
    return (
        <div className="relative max-h-screen flex flex-col gap-1 items-center pt-10 md:pt-10 bg-light text-dark">

            {/* Background Shapes with Blur (same as HomePage) */}
            <div className="fixed  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
                <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
            </div>

            {/* Content Section */}
            <div className='flex items-center gap-3 pb-5'>
                <div>
                    <Link to={`/all-quizzes`}>
                        <i className="fa-solid fa-arrow-right rotate-180 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center "></i>
                    </Link>
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl  font-bold text-gray-200  text-center tracking-wide">Leaderboard</h1>
                </div>
            </div>


            <div className='gap-5 flex-col flex w-[90%] px-2 sm:w-[80%] md:w-[45rem] max-h-[calc(100vh-12rem)] overflow-y-auto '>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
                <div className='flex  items-center gap-2'>
                    <h1 className='text-2xl'>1.</h1>
                    <UserBox />
                </div>
            </div>

            {/* Home Button */}
            {/* <div onClick={() => navigate('/')} className="mt-4 cursor-pointer">
                <GoToHomeButton />
            </div> */}


        </div>
    )
}

export default LeaderboardPage