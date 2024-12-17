import React, { useState } from 'react';

const QuizQuestionBox = ({ question, options, currentQuestionIndex, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-finalDark rounded-md border border-gray-500 border-opacity-80 px-5 py-3">
      {/* name of question with question number */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-1 text-xl md:text-2xl py-2">
        <div className='flex gap-0.5'>
          <h1 className="font-semibold">{currentQuestionIndex + 1}.</h1>
          <p className='text-xl md:text-2xl'>{question}</p>
        </div>
        <p className='bg-white text-black font-semibold flex items-center px-2.5 mb-1 py-0.5 rounded-full text-sm '>00:60</p>
      </div>
      {/* options of the quiz */}
      <div className="space-y-2 pb-2 pt-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <button
              className={`px-1 py-2.5 rounded-md text-lg w-full border border-gray-500 border-opacity-20 ${
                selectedOption === option ? 'bg-Ngreen text-white' : 'bg-finalDark hover:bg-Ngreen'
              }`}
              onClick={() => handleOptionClick(option)}
              id={option}
              name={`question-${currentQuestionIndex}`}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionBox;