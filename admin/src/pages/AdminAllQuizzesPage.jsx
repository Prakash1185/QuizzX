import React, { useContext, useEffect, useState } from 'react';
import QuizBox from '../components/QuizBox';
import { handleError } from '../components/ToastMessages';
import { AdminContext } from '../context/AdminContext';

const AdminAllQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // New state to handle loading
  const { BackendURL } = useContext(AdminContext);

  // function to get all the quizzes
  const getAllQuizzes = async () => {
    try {
      const response = await fetch(`${BackendURL}/quiz/all-quizzes`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      const result = await response.json();
      const { success, message, quizzes } = result;

      if (success) {
        setQuizzes(quizzes);
      }

      if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched or an error occurs
    }
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <div className="sm:mx-10 mx-auto sm:py-10 max-h-[90vh] overflow-y-scroll overflow-x-auto">
      <div className="flex flex-col -space-y-20 sm:-space-y-0 sm:gap-16 -mt-5 sm:-mt-0">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
            <p className="ml-3 text-xl font-poppins">Loading quizzes...</p>
          </div>

        ) : quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizBox
              key={quiz._id}
              attendes={quiz.attendes.length}
              bannerImage={quiz.bannerImage}
              date={new Date(quiz.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
              description={quiz.description}
              id={quiz._id}
              quizTimeLimit={quiz.quizTimeLimit}
              title={quiz.title}
              getAllQuizzes={getAllQuizzes}
              setQuizzes={setQuizzes}
              quizzes={quizzes}
              isEntryAllowed={quiz.isEntryAllowed}
            />
          ))
        ) : (
          <p className="text-xl font-poppins">No quizzes available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAllQuizzesPage;
