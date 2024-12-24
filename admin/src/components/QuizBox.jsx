import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActivateQuiz, DeleteQuiz, GreenBadge, Leaderboard, ManageQuiz, OrangeBadge, QuizActions, RedBadge } from './Buttons'
import { AdminContext } from '../context/AdminContext'
import { handleError, handleSuccess } from './ToastMessages'
import { FaRegTrashCan } from 'react-icons/fa6'
import { Link } from 'react-router-dom';

const QuizBox = ({ bannerImage, attendes, date, quizTimeLimit, title, description, id, quizzes, setQuizzes }) => {

    const { getAllQuizzes, BackendURL } = useContext(AdminContext)

    // const [isActivated, setIsActivated] = useState(() => quizzes.find(quiz => quiz._id === id)?.isActivated);
    const [isEntryAllowed, setIsEntryAllowed] = useState(() => quizzes.find(quiz => quiz._id === id)?.isEntryAllowed);
    const [isSlowLeaderboard, setIsShowLeaderboard] = useState(() => quizzes.find(quiz => quiz._id === id)?.showLeaderboard);

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
    // const toggleQuizActivation = async () => {
    //     try {
    //         const updatedStatus = !isActivated; // Toggle the status
    //         const response = await fetch(`${BackendURL}/quiz/update-status/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: localStorage.getItem("token"),
    //             },
    //             body: JSON.stringify({ isActivated: updatedStatus }),
    //         });

    //         const result = await response.json();
    //         const { success, message } = result;

    //         if (success) {
    //             handleSuccess(message);
    //             setIsActivated(updatedStatus); // Update local state
    //             getAllQuizzes(); // Refresh the quiz list
    //         } else {
    //             handleError(message);
    //         }
    //     } catch (error) {
    //         handleError(error);
    //     }
    // };

    // function to start and stop quiz


    const toggleEntryAllowed = async () => {

        try {
            const updatedStatus = !isEntryAllowed; // Toggle the status
            const response = await fetch(`${BackendURL}/quiz/update-entry/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ isEntryAllowed: updatedStatus }),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                setIsEntryAllowed(updatedStatus);
                getAllQuizzes();
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    // function to show or hide leaderboard quiz
    const toggleShowLeaderboard = async () => {
        try {
            const updatedStatus = !isSlowLeaderboard; // Toggle the status
            const response = await fetch(`${BackendURL}/quiz/update-leaderboard-status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ showLeaderboard: updatedStatus }),
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message);
                setIsShowLeaderboard(updatedStatus); // Update local state
                getAllQuizzes(); // Refresh the quiz list
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    };




    return (
        <div className='scale-[80%]  min-[550px]:scale-[85%] sm:scale-100 '>
            <div className='min-w-[26rem] sm:min-w-[28rem] md:w-[50rem]  md:h-[23.5rem] bg-finalDark bg-opacity-90 rounded-md border  border-gray-500 md:flex-row flex-col flex gap-32 md:gap-3  justify-center border-opacity-85 px-2 sm:py-1 py-2.5'>

                <div id="left" className='w-[25rem] h-[17rem] md:h-[16rem] mx-auto '>
                    <img src={bannerImage} className='h-full w-full object-cover px-2.5 py-2.5 mb-1 rounded-[15px]' alt="" />
                    <div className='text-lg font-medium px-2.5 py-3 md:py-0.5 flex  justify-between flex-col md:flex-row md:items-end border-b border-gray-500 border-opacity-80 pb-5 md:border-none md:pb-0'>
                        <div className='flex flex-col gap-0.5 '>
                            <p className=''>Attendes : {attendes}</p>
                            <p className=''>Created : {date}</p>
                            <p className=''>Status : {isEntryAllowed ? <GreenBadge text={"Active"} /> : <OrangeBadge text={"Not Active"} />}</p>
                        </div>

                        <div className='flex justify-end gap-2 -mt-10 md:mt-4'>
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

                <div id="right" className='w-[23rem] py-3.5 md:py-2.5 sm:px-1.5 md:px-2 mx-auto md:mx-0 flex flex-col justify-between  ' >
                    <div>
                        <h1 className='text-3xl font-medium md:tracking-tight text-center md:text-start sm:px-1 md:px-0 sm:tracking-tighter mb-4'>{title}</h1>
                        {/* <p className='text-sm text-gray-400 py-3 text-center tracking-tight md:tracking-normal md:text-start max-h-16 overflow-y-auto'>{description}</p> */}
                    </div>
                    <div className='flex flex-col gap-2.5 sm:gap-3 md:gap-2.5 sm:pb-4 md:pb-0'>

                        {/* <ActivateQuiz text={"Activate"} /> */}
                        {/* <h1

                            onClick={toggleQuizActivation}
                            className="bg-Ngreen hover:bg-Dgreen
                                 transition-all duration-200 py-3 px-10 text-lg text-center text-white rounded-md font-semibold cursor-pointer"
                        >
                            {isActivated ? "Deactivate" : "Activate"}
                        </h1> */}
                        {/* Allow Entry */}
                        <h1

                            onClick={toggleEntryAllowed}
                            className="bg-Ngreen hover:bg-Dgreen
                                 transition-all duration-200 py-3 px-10 text-lg text-center text-white rounded-md font-semibold cursor-pointer"
                        >
                            {isEntryAllowed ? "Stop Quiz" : "Start Quiz"}
                        </h1>
                        {/* Show leaderboard */}
                        <h1

                            onClick={toggleShowLeaderboard}
                            className="bg-orange-700 hover:bg-orange-800
                                 transition-all duration-200 py-3 px-10 text-lg text-center text-white rounded-md font-semibold cursor-pointer"
                        >
                            {isSlowLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                        </h1>
                        {/* <Leaderboard id={id} text={"Leaderboard"} /> */}
                        <Link to={`/admin/quiz/${id}/leaderboard`}>
                            <button className="bg-purple-700  hover:bg-purple-800 transition-all duration-200 py-3 px-10 text-lg text-white w-full sm:w-[22rem] rounded-md font-semibold">
                                Manage Leaderboard
                            </button>
                        </Link>
                        <ManageQuiz id={id} text={"Manage Quiz"} />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default QuizBox