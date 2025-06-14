import React, { useEffect, useState } from 'react';
import { GoToHomeButton } from '../components/Buttons';
import UserBox from '../components/UserBox';
import { Link } from 'react-router-dom';
import { UserContext } from './../context/UserContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { handleError } from '../components/ToastMessages';

const LeaderboardPage = () => {
    const [attendes, setAttendes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const { BackendURL } = useContext(UserContext);
    const { quizId } = useParams();

    const checkLeaderboardStatus = async () => {
        try {
            const response = await fetch(`${BackendURL}/quiz/${quizId}/leaderboard/status`);
            const result = await response.json();
            setShowLeaderboard(result.showLeaderboard); // Directly set showLeaderboard
        } catch (error) {
            handleError("Something went wrong!");
            setShowLeaderboard(false);
        }
    };

    const getLeaderboard = async () => {
        try {
            const response = await fetch(`${BackendURL}/user/${quizId}/users`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            const result = await response.json();
            if (result.users) {
                setAttendes(result.users);
            }
        } catch (error) {
            handleError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializePage = async () => {
            await checkLeaderboardStatus(); 
            if (showLeaderboard) {
                getLeaderboard(); 
            } else {
                setLoading(false); 
            }
        };
        initializePage();
    }, [showLeaderboard]); 

    return (
        <div className="relative max-h-screen flex flex-col gap-1 items-center pt-10 md:pt-10 bg-light text-dark">
            <div className="fixed top-0 left-0 w-full h-full z-[-10] overflow-hidden">
                <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
            </div>

            <div className="flex items-center gap-3 pb-5">
                <div>
                    <Link to={`/all-quizzes`}>
                        <i className="fa-solid fa-arrow-right rotate-180 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center"></i>
                    </Link>
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-200 text-center tracking-wide">Leaderboard</h1>
                </div>
            </div>

            <div className="gap-3 flex-col flex w-[90%] px-2 sm:w-[80%] md:w-[45rem] max-h-[calc(100vh-12rem)] overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center mt-10">
                        <div className="spinner"></div>
                        <p className="ml-3 text-xl font-poppins">Loading leaderboard...</p>
                    </div>
                ) : showLeaderboard ? (
                    attendes.length > 0 ? (
                        attendes.map((attendee, index) => (
                            <div key={attendee._id} className="flex items-center justify-between w-full px-4 py-3 rounded-md bg-opacity-25 text-white bg-gray-800">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-medium">{index + 1}.</h1>
                                    <UserBox Name={attendee.name} Score={attendee.score} />
                                </div>
                                <div className="text-lg font-semibold">{attendee.score}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl font-poppins text-center">No attendees found.</p>
                    )
                ) : (
                    <p className="text-xl font-poppins text-center">Leaderboard is not available.</p>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;
