import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { handleError, handleSuccess } from '../components/ToastMessages';

const CreateAccountPage = () => {
  const [accountInfo, setAccountInfo] = useState({ name: '' });
  const [canNavigate, setCanNavigate] = useState(true);
  const { isAccountCreated, setIsAccountCreated, BackendURL } = useContext(UserContext);
  const { quizId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [isLoading, setIsLoading] = useState(false);

  const checkEntryStatus = async () => {
    try {
      const response = await fetch(`${BackendURL}/quiz/${quizId}/status`);
      const result = await response.json();
      const { success, isEntryAllowed } = result;
      if (success) {
        return isEntryAllowed; // Return the entry status directly
      } else {
        handleError("Something went wrong!");
        return false; // Default to false if the API call fails
      }
    } catch (error) {
      handleError("Something went wrong!");
      return false; // Return false on error
    }
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Mark the quiz as attempted
  const handleQuizAttempted = async (userId) => {
    if (!userId) {
      // console.error('Error: userId is undefined in handleQuizAttempted');
      return handleError('Unable to mark quiz as attempted: user ID is missing.');
    }

    try {
      const response = await fetch(`${BackendURL}/user/add-quiz/${quizId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();
      const { success } = result;
      if (success) {
        // console.log('Quiz marked as attempted:', result);
      } else {
        throw new Error(result.message || 'Failed to mark quiz as attempted.');
      }
    } catch (error) {
      // console.error('Error in handleQuizAttempted:', error);
      handleError(error.message || 'Something went wrong !');
      setCanNavigate(false);
    }
  };

  // Add the user to quiz attendees
  const addUserToAttendees = async (userId) => {
    if (!userId) {
      // console.error('Error: userId is undefined in addUserToAttendees');
      // return handleError('Unable to add user to attendees: user ID is missing.');
      return handleError('Something went wrong!');
    }

    try {
      const response = await fetch(`${BackendURL}/quiz/${quizId}/update-attendee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ quizId, userId }),
      });

      const result = await response.json();
      const { success } = result
      if (success) {
        // handleSuccess('User added to attendees.');
      } else {
        throw new Error(result.message || 'Failed to add user to attendees.');
      }
    } catch (error) {
      // console.error('Error in addUserToAttendees:', error);
      handleError(error.message || 'Something went wrong while adding user to attendees.');
      setCanNavigate(false);
    }
  };

  // Create a new account
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Check if entry is allowed before proceeding with the submission
    const isAllowed = await checkEntryStatus(); // Get the status directly

    // If entry is not allowed, show error and exit
    if (!isAllowed) {
      return handleError("Entry not allowed!");
    }
    const { name } = accountInfo;

    if (!name) {
      return handleError('Please enter your name');
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BackendURL}/user/create-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountInfo),
      });

      const result = await response.json();
      const { success, message, token, id, name } = result;

      if (success) {
        handleSuccess(message);
        setIsAccountCreated(true);

        // Store details in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('name', name);

        // Run additional actions
        await handleQuizAttempted(id);
        await addUserToAttendees(id);

        // If no error occurred, navigate
        if (canNavigate) {
          setAccountInfo({ name: '' });
          navigate(`/quiz/${quizId}`);
        }
      } else {
        handleError(message || 'Failed to create account.');
        setCanNavigate(false);
      }
    } catch (error) {
      // console.error('Error in handleCreateAccount:', error);
      handleError(error.message || 'Something went wrong while creating the account.');
      setCanNavigate(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-20">
      <div className="fixed top-0 left-0 w-full h-full z-[-10] overflow-hidden">
        <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
      </div>
      <div className="w-[25rem] md:w-[27rem] scale-90 sm:scale-100 bg-finalDark rounded-md border border-gray-500 border-opacity-80 flex flex-col px-4 py-10 gap-4">
        <h1 className="text-[1.75rem] font-semibold text-center tracking-wide">Enter Your Name</h1>
        <form onSubmit={handleCreateAccount} className="w-full flex flex-col gap-4">
          <input
            type="text"
            className="border border-dark py-2 rounded-md px-2 mx-1 sm:mx-3 text-black outline-none"
            name="name"
            value={accountInfo.name}
            onChange={handleChange}
            autoComplete="off"
          />
          {/* <button
            type="submit"
            className="bg-Ngreen hover:bg-Dgreen transition-all duration-300 py-3 px-28 md:px-36 mx-auto text-center text-lg text-white rounded-md font-semibold cursor-pointer"
          >
            Start Quiz
          </button> */}

          <button
            type="submit"
            className={`bg-Ngreen hover:bg-Dgreen transition-all duration-300 py-3 px-28 md:px-36 mx-auto text-center text-lg text-white rounded-md font-semibold cursor-pointer ${isLoading ? 'cursor-not-allowed ' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Starting...' : 'Start Quiz'} {/* Change button text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
