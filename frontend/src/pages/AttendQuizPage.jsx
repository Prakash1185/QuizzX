import React, { useState } from 'react';
import QuizQuestionBox from '../components/QuizQuestionBox';
import { NextButton, SubmitButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';

const AttendQuizPage = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: "Mars",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"],
      correct: "Harper Lee",
    },
  ];

  const navigate = useNavigate()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Function to go to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle form submission (on last question)
  const handleSubmit = () => {
    navigate('/quiz/:id/success')
    // Additional logic for submitting answers (like saving the result) can be added here.
  };

  return (
    <div className='w-[20rem] sm:w-[40rem] md:w-[55rem] lg:w-[75rem] mx-auto  '>

<div className="fixed  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
          <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
          <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
        </div>

      <div className="mx-2 sm:mx-14 md:mx-40 lg:mx-60 flex justify-center flex-col py-5">
        {/* NAME OF THE QUIZ */}
        <h1 className="bg-finalDark border border-gray-500 border-opacity-80 py-3 rounded-md text-xl sm:text-2xl md:text-3xl mx-auto px-1 md:px-2 lg:px-2.5 text-center font-medium mt-5 w-full">
          Mandatory Random Survey Quiz 2024
        </h1>

        {/* QUESTIONS OF THE QUIZ */}
        <div className="py-5 pt-8 flex flex-col gap-5">
          <QuizQuestionBox
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        </div>

        {/* BUTTONS */}
        <div className=" pb-7 md:pb-0 ">
          {currentQuestionIndex === questions.length - 1 ? (
            <div
              onClick={handleSubmit}
              className='flex justify-center items-center'
            >
              <SubmitButton/>
            </div>
          ) : (
            <div
              onClick={nextQuestion}
              className='flex justify-center items-center'
            >
              <NextButton/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendQuizPage;
