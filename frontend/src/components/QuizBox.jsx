import React, { useContext } from 'react';
import { EnterQuiz, Leaderboard } from './Buttons';
import { useNavigate } from 'react-router-dom';
import { handleWarning } from './ToastMessages';

const QuizBox = ({ quizId, title, description, bannerImage, showLeaderboard, isEntryAllowed }) => {
  const navigate = useNavigate();

  const truncateDescription = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleEnterClick = () => {
    if (isEntryAllowed) {
      navigate(`/${quizId}/create-account`);
    } else {
      handleWarning('Quiz not started!');
    }
  };

  const handleLeaderboardClick = () => {
    navigate(`/quiz/${quizId}/leaderboard`);
  };

  return (
    <div className="scale-[77%] min-[550px]:scale-[80%] sm:scale-100">
      <div className="md:w-[50rem] md:h-[18rem] bg-finalDark border-opacity-80 rounded-md border border-gray-500 md:flex-row flex-col flex gap-3 items-center justify-center sm:my-16 md:my-0">
        <div id="left" className="w-[25rem] h-[17rem] md:h-[16rem] ">
          <img src={bannerImage} className="h-full w-full object-cover px-2.5 py-2.5 rounded-[15px]" alt="" />
        </div>
        <div id="right" className="w-[23rem] py-2.5 px-1.5 mx-auto md:mx-0 md:flex md:flex-col md:justify-between  md:gap-2  md:h-[16rem]">
          <div>
            <h1 className="text-3xl font-medium md:tracking-tight text-center md:text-start px-1 md:px-0 tracking-tighter">
              {title}
            </h1>
            <p className="px-1.5 text-gray-500 py-3 md:py-2.5 text-center tracking-tight md:tracking-normal md:text-start">
              {truncateDescription(description, 20)}
            </p>
          </div>
          <div
            onClick={showLeaderboard ? handleLeaderboardClick : handleEnterClick}
            className="pt-4 text-center hover:cursor-pointer md:pr-5 pb-2 md:pb-0"
          >
            {showLeaderboard ? <Leaderboard /> : <EnterQuiz />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBox;
