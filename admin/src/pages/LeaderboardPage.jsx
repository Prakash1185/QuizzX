import React, { useState } from 'react'
import UserBox from '../components/UserBox'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from './../context/AdminContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LeaderboardPage = () => {

    const { BackendURL } = useContext(AdminContext)
    const { quizId } = useParams()
    const [attendes, setAttendes] = useState([]);

    const getLeaderboard = async () => {
        try {
            const response = await fetch(`${BackendURL}/user/${quizId}/attendes`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            const result = await response.json();
            const { success, attendes } = result

            if (success) {
                // console.log(attendes);
                setAttendes(attendes);
            } else {
                // console.log(result.message);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        getLeaderboard();
    }, []);


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
                {attendes.map((attendee, index) => (
                    <UserBox key={attendee._id} Name={attendee.name} Score={attendee.score} id={attendee._id} index={index} getLeaderboard={getLeaderboard} />
                ))}
            </div>
        </div>
    )
}

export default LeaderboardPage