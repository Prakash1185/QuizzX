import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActivateQuiz, DeleteQuiz, Leaderboard, ManageQuiz, QuizActions, RedBadge } from './Buttons'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from './ToastMessages'
import { FaRegTrashCan } from 'react-icons/fa6'

const QuizBox = ({ bannerImage, attendes, date, quizTimeLimit, title, description, id, quizzes, setQuizzes }) => {

    const { getAllQuizzes, BackendURL } = useContext(AdminContext)

    const [isActivated, setIsActivated] = useState(() => quizzes.find(quiz => quiz._id === id)?.isActivated);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BackendURL}/quiz/delete-quiz/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            const result = await response.json()
            const { success, message } = result

            if (success) {
                handleSuccess(message)
                setQuizzes(quizzes.filter(quiz => quiz._id !== id));
            }

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    const [countdown, setCountdown] = useState(quizTimeLimit * 60);

    useEffect(() => {
        if (countdown <= 0) return

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [countdown])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60

        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`
    }

    // function to activate quiz
    const toggleQuizActivation = async () => {
        try {
            const updatedStatus = !isActivated; // Toggle the status
            const response = await fetch(`${BackendURL}/quiz/update-status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ isActivated: updatedStatus }),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                setIsActivated(updatedStatus); // Update local state
                getAllQuizzes(); // Refresh the quiz list
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    };




    return (
        <div className='scale-[75%]  min-[550px]:scale-[80%] sm:scale-100'>
            <div className=' md:w-[50rem] md:h-[23rem] bg-finalDark bg-opacity-90 rounded-md border  border-gray-500 md:flex-row flex-col flex gap-3  justify-center border-opacity-85 px-2 py-1'>

                <div id="left" className='w-[25rem] h-[17rem] md:h-[16rem]'>
                    <img src={bannerImage} className='h-full w-full object-cover  px-2.5 py-2.5 mb-1 rounded-[15px]' alt="" />
                    <div className='text-lg font-medium px-2.5 py-0.5 flex  justify-between flex-col md:flex-row items-end'>
                        <div className='flex flex-col '>
                            <p className=''>Attendes : {attendes}</p>
                            <p className=''>Created : {date}</p>
                            <p className=''>Validity : {countdown > 0 ? formatTime(countdown) : <RedBadge text={"Expired"} />}</p>
                        </div>

                        <div className='flex justify-end gap-2 mt-4'>
                            <button
                                className='border  border-red-600 text-red-600 hover:bg-red-600 transition-all duration-200 py-1.5 px-5 text-lg hover:text-white rounded-md font-semibold'
                                onClick={() => handleDelete(id)}
                            >
                                {/* <FaRegTrashCan /> */}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div id="right" className='w-[23rem] py-2.5 px-1.5 md:px-2 mx-auto md:mx-0 flex flex-col justify-between '>
                    <div>
                        <h1 className='text-3xl font-medium md:tracking-tight text-center md:text-start px-1 md:px-0 tracking-tighter'>{title}</h1>
                        <p className='text-sm text-gray-400 py-3 text-center tracking-tight md:tracking-normal md:text-start max-h-16 overflow-y-auto'>{description}</p>
                    </div>
                    <div className='flex flex-col gap-2.5'>

                        {/* <ActivateQuiz text={"Activate"} /> */}
                        <h1

                            onClick={toggleQuizActivation}
                            className="bg-Ngreen hover:bg-Dgreen
                                 transition-all duration-200 py-3 px-10 text-lg text-center text-white rounded-md font-semibold cursor-pointer"
                        >
                            {isActivated ? "Deactivate" : "Activate"}
                        </h1>
                        <Leaderboard id={id} text={"Leaderboard"} />
                        <ManageQuiz id={id} text={"Manage"} />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default QuizBox