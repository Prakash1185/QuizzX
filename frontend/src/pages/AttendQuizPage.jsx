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
    <div>
      <div className="mx-10 sm:mx-20 md:mx-40 lg:mx-60 flex justify-center flex-col py-5">
        {/* NAME OF THE QUIZ */}
        <h1 className="bg-white border border-dark py-2.5 rounded-md text-3xl mx-auto px-1 md:px-2 lg:px-2.5 text-center font-medium mt-5 w-full">
          Title of the quiz will go here
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
        <div className="  ">
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
