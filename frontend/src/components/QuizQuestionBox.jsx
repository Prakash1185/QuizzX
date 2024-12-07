import React from 'react';

const QuizQuestionBox = ({ question, options, currentQuestionIndex, totalQuestions }) => {
  return (
    <div className="bg-white rounded-md border border-dark px-5 py-3 w-full">
      {/* name of question with question number */}
      <div className="flex gap-1 text-lg py-2">
        <h1 className="font-semibold">{currentQuestionIndex + 1}.</h1>
        <p>{question}</p>
      </div>
      {/* options of the quiz */}
      <div className="space-y-2 pb-2 pt-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              id={option} // Add unique id for the radio button
              name={`question-${currentQuestionIndex}`} // Keep the same name for all options in a question
              value={option}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionBox;
