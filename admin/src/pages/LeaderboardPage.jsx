import React, { useState, useEffect, useContext } from 'react';
import UserBox from '../components/UserBox';
import { Link, useParams } from 'react-router-dom';
import { AdminContext } from './../context/AdminContext';
import { handleError, handleSuccess } from '../components/ToastMessages';

const LeaderboardPage = () => {
    const { BackendURL } = useContext(AdminContext);
    const { quizId } = useParams();
    const [attendes, setAttendes] = useState([]);
    const [loading, setLoading] = useState(true); // New state to handle loading



    const getLeaderboard = async () => {
        try {
            const response = await fetch(`${BackendURL}/user/${quizId}/attendes`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            const result = await response.json();
            const { success, attendes } = result;

            if (success) {
                setAttendes(attendes);
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false once the data is fetched or an error occurs
        }
    };

    const deleteAllAttendes = async () => {
        try {
            const response = await fetch(`${BackendURL}/user/users/delete-by-quiz/${quizId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            const result = await response.json();
            console.log(result); 
            const { success, message } = result;

            if (success) {
                getLeaderboard();
                handleSuccess(message);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.error(error);  
            handleError('Failed to delete all attendes');
        }
    };


    useEffect(() => {
        getLeaderboard();
    }, [quizId]);

    return (
        <div className="mx-10 py-5 overflow-x-auto">
            <div className="flex items-center gap-5">
                <Link to={`/admin/all-quizzes`}>
                    <button className="font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20">
                        Back
                    </button>
                </Link>
                <h1 className="text-2xl font-medium">Leaderboard</h1>
                <div >
                    <button onClick={deleteAllAttendes} className='bg-red-600 hover:bg-red-700 transition-all duration-300 px-3 py-1 text-white rounded-md'>Delete all attendes
                    </button>
                </div>
            </div>

            {/* Display loading spinner if data is being fetched */}
            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="spinner"></div>
                    <p className="ml-3 text-xl font-poppins">Loading leaderboard...</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3 mt-5 w-[40rem] max-h-[calc(100vh-12rem)] overflow-y-auto">
                    {attendes.length > 0 ? (
                        attendes.map((attendee, index) => (
                            <UserBox
                                key={attendee._id}
                                Name={attendee.name}
                                Score={attendee.score}
                                id={attendee._id}
                                index={index}
                                getLeaderboard={getLeaderboard}
                            />
                        ))
                    ) : (
                        <p className="text-xl font-poppins">No attendees found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LeaderboardPage;
