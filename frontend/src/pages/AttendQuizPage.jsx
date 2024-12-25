import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import QuizQuestionBox from '../components/QuizQuestionBox';
import { handleError, handleSuccess } from '../components/ToastMessages';
import { NextButton, SubmitButton } from './../components/Buttons';

const AttendQuizPage = () => {
  const { quizId } = useParams();
  const { BackendURL } = useContext(UserContext);
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Set default time for each question
  const [selectedOptions, setSelectedOptions] = useState([]);
  let timer;

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


  const getQuestionsForUser = async () => {
    try {
      const response = await fetch(`${BackendURL}/quiz/${quizId}/questions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      const { success, quiz } = result;
      if (success) {
        setQuiz(quiz);
        setQuestions(quiz.questions);
      }
    } catch (error) {
      console.error('Error in getQuestionsForUser:', error);
    }
  };

  useEffect(() => {
    getQuestionsForUser();
  }, [quizId]);

  // Timer for each question
  useEffect(() => {
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
    } else {
      clearInterval(timer);
      handleTimeUp(); // Call handleTimeUp when the timer ends
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60); // Reset the timer for the next question
    }
  };

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      handleSubmit();
    }
  };

  const handleNextQuestion = () => {
    clearInterval(timer); // Clear the timer to prevent double increment
    nextQuestion();
  };

  // Loading state
  if (!quiz.title) {
    return <h1 className='text-2xl font-semibold text-gray-200 pt-10 text-center '>Loading...</h1>;
  }


  // Function to handle option selection
  const handleOptionSelect = (questionIndex, optionId) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[questionIndex] = optionId;
    setSelectedOptions(updatedSelections);
  };

  // Submit the selected options to the backend
  const handleSubmit = async () => {


    const isAllowed = await checkEntryStatus();

    // If entry is not allowed, show error and exit
    if (!isAllowed) {
      return handleError("Submission not allowed at this time.");
    }

    setIsLoading(true);

    try {
      // Submit selected options first
      const response = await fetch(`${BackendURL}/user/${quizId}/store-options`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          optionsSelected: selectedOptions.filter((id) => id), // Filter out empty values
        }),
      });

      const result = await response.json();
      if (!result.success) {
        return handleError(result.message || "Failed to save options");
      }

      // Calculate the score
      const scoreResponse = await fetch(`${BackendURL}/user/calculate-score/${quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
        }),
      });

      const scoreResult = await scoreResponse.json();
      const { success, message, score } = scoreResult;
      if (success) {
        // handleSuccess(`Your score is ${score}`);
        navigate(`/quiz/${quizId}/success`);
        // localStorage.removeItem('userId');
        // localStorage.removeItem('token');
        // localStorage.removeItem('name')
      }
      if (!success) {
        return handleError(scoreResult.message || "Something went wrong!");
      }

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      handleError(error.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className='w-[20rem] sm:w-[40rem] md:w-[55rem] lg:w-[75rem] mx-auto'>
      <div className="fixed top-0 left-0 w-full h-full z-[-10] overflow-hidden">
        <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
      </div>
      <div className="mx-2 sm:mx-14 md:mx-40 lg:mx-60 flex justify-center flex-col py-5">
        <h1 className="bg-finalDark border border-gray-500 border-opacity-80 py-3 rounded-md text-xl sm:text-2xl md:text-3xl mx-auto px-1 md:px-2 lg:px-2.5 text-center font-medium mt-5 w-full">
          {quiz.title}
        </h1>
        <div className="py-5 pt-8 flex flex-col gap-5">
          {questions.length > 0 && (
            <QuizQuestionBox
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              questionTimeLimit={quiz.questionTimeLimit}
              onTimeUp={handleTimeUp}
              onOptionSelect={(optionId) => handleOptionSelect(currentQuestionIndex, optionId)}
            />
          )}
        </div>
        {questions.length > 0 && (
          currentQuestionIndex === questions.length - 1 ? (
            <div onClick={handleSubmit} className="flex justify-center items-center">
              <button
                type="submit"
                className={`bg-Ngreen hover:bg-Dgreen transition-all duration-300  py-3 w-full text-center text-lg text-white rounded-md font-semibold cursor-pointer ${isLoading ? 'cursor-not-allowed bg-gray-400' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'submitting...' : 'Submit'} {/* Change button text based on loading state */}
              </button>
            </div>
          ) : (
            <div onClick={handleNextQuestion} className="flex justify-center items-center">
              <NextButton />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AttendQuizPage;
