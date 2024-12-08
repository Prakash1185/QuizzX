import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteQuiz, QuizActions } from './Buttons'

const QuizBox = () => {
    const navigate = useNavigate()

    return (
        <div className='scale-[75%]  min-[550px]:scale-[80%] sm:scale-100'>
            <div className=' md:w-[50rem] md:h-[23rem] bg-white bg-opacity-90 rounded-md border  border-dark md:flex-row flex-col flex gap-3  justify-center border-opacity-85 px-2 py-1'>

                <div id="left" className='w-[25rem] h-[17rem] md:h-[16rem]'>
                    <img src="https://www.filsantejeunes.com/wp-content/uploads/2020/10/Quiz2LG.jpg" className='h-full w-full object-cover  px-2.5 py-2.5 rounded-[15px]' alt="" />
                    <div className='text-lg font-medium px-2.5 py-0.5 flex justify-between flex-col md:flex-row items-end'>
                        <div className='flex flex-col '>
                            <p>Time : Time</p>
                            <p>Date : Date</p>
                            <p>Ending in : Timer</p>
                        </div>

                        <div className=''>
                            <DeleteQuiz text={"Delete"} />
                        </div>

                    </div>
                </div>
                <div id="right" className='w-[23rem] py-2.5 px-1.5 md:px-2 mx-auto md:mx-0 '>
                    <h1 className='text-3xl font-medium md:tracking-tight text-center md:text-start px-1 md:px-0 tracking-tighter'>Title of the quiz will go here</h1>
                    <p className='text-sm text-gray-800 py-3 text-center tracking-tight md:tracking-normal md:text-start'>some extra details about the quiz will go here like username and links etc. some extra details about the quiz will go here like username and links etc</p>
                    <div onClick={() => navigate(`/create-account`)} className='flex flex-col gap-2'>

                        <QuizActions text={"Activate"} />
                        <QuizActions text={"Attendees"} />
                        <QuizActions text={"Modify"} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuizBox