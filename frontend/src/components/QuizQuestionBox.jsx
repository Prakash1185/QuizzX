import React, { useState, useEffect } from 'react';

const QuizQuestionBox = ({ question, options, currentQuestionIndex, totalQuestions, questionTimeLimit, onTimeUp ,onOptionSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(questionTimeLimit);

  useEffect(() => {
    setTimeLeft(questionTimeLimit); // Reset the timer for each new question
  }, [question, questionTimeLimit]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else {
      clearInterval(timer);
      onTimeUp();
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onOptionSelect) {
      onOptionSelect(option._id); // Send the selected option's ID to the parent
    }
  };

  const formatTime = (seconds) => {
    if (seconds > 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `00:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-finalDark rounded-md border border-gray-500 border-opacity-80 px-5 py-3">
      {/* Question and Timer */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-1 text-xl md:text-2xl py-2">
        <div className="flex gap-0.5">
          <h1 className="font-semibold">{currentQuestionIndex + 1}.</h1>
          <p className="text-xl md:text-2xl">{question}</p>
        </div>
        <p className="bg-white text-black font-semibold flex items-center px-2.5 mb-1 py-0.5 rounded-full text-sm">
        {formatTime(timeLeft)}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 pb-2 pt-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <button
              className={`px-1 py-2.5 rounded-md text-lg w-full border border-gray-500 border-opacity-20 ${selectedOption === option ? 'bg-Ngreen text-white' : 'bg-finalDark hover:bg-Ngreen'
                }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionBox;