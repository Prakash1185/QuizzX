import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { handleError, handleSuccess } from '../components/ToastMessages';

const ManageQuestionPage = () => {
  const { quizInfo, getAllQuestions, setQuestions, questions, BackendURL } = useContext(AdminContext);
  const { quizId } = useParams();


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BackendURL}/quiz/delete-question/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      const result = await response.json()
      const { success, message } = result

      if (success) {
        handleSuccess(message)
        // setQuestions(questions.filter(question => question._id !== id));
        getAllQuestions(quizId);
      }

      if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getAllQuestions(quizId);
  }, [quizId]);

  return (
    <div className="mx-10 py-5 overflow-x-auto">
      <div className="flex items-center gap-5 pb-2">
        <div>
          <Link to={`/admin/quiz/${quizId}/manage`}>
            <button className="font-inter bg-gray-800 text-white py-2 px-5 rounded-md w-20">Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/admin/quiz/${quizId}/add-question`}>
            <button className="font-inter bg-Ngreen text-white py-2 px-5 rounded-md md:w-72">Add Question</button>
          </Link>
        </div>
        <h1 className="font-semibold text-2xl font-poppins hidden lg:block">
          Total Questions: {questions.length}
        </h1>
      </div>
      <h1 className="font-semibold text-2xl font-poppins lg:hidden py-5 pb-2">
        Total Questions: {questions.length}
      </h1>
      <div className="flex flex-col gap-5 mt-5 md:w-[40rem] max-h-[calc(100vh-12rem)] overflow-y-auto">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-finalDark px-5 py-3 shadow-md rounded-md  flex flex-col gap-2 w-full border border-gray-500 border-opacity-50"
            >
              <div>
                <div className="flex md:items-center gap-1 bg-dark2 border border-gray-500 border-opacity-20 rounded-md px-3 py-2 text-lg">
                  <h1 className="">Q{index + 1}:</h1>
                  <h1 className='overflow-x-auto'>{question.question}</h1>
                </div>
                <div className="flex flex-col gap-1.5 items-start mt-2">
                  {question.options.map((option, i) => (
                    <h1
                      key={i}
                      className="border border-gray-500 border-opacity-20 rounded-md bg-dark2 md:pl-4 px-2.5 md:px-0 py-2 w-full text-start overflow-x-auto"
                    >
                      {option.text}
                    </h1>
                  ))}
                </div>
                <h1 className="border border-gray-500 border-opacity-20 rounded-md bg-dark2 py-2 pl-4 w-full text-start mt-5 overflow-x-auto">
                  Correct Option: {question.options.find(opt => opt._id === question.correctOption)?.text || "Not Found"}
                </h1>
                <div className='flex flex-col md:flex-row gap-3 md:gap-5 mt-4 w-full'>
                  <Link to={`/admin/quiz/${quizId}/edit-question/${question._id}`} className="md:w-1/2">
                    <button className="font-inter bg-blue-600 text-white py-2 px-5 rounded-md w-full">
                      Edit Question
                    </button>
                  </Link>
                  <div className="md:w-1/2">
                    <button onClick={() => handleDelete(question._id)} className="font-inter bg-red-600 text-white py-2 px-5 rounded-md w-full">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-white text-center">No questions available for this quiz.</h2>
        )}
      </div>
    </div>
  );
};

export default ManageQuestionPage;
