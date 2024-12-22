import { createContext, useEffect, useState } from "react";
import { handleError } from "../components/ToastMessages";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [quizInfo, setQuizInfo] = useState({})
    const [questions, setQuestions] = useState([])
    const [questionInfo, setQuestionInfo] = useState({})
    const [users, setUsers] = useState([])

    const navigate = useNavigate()
    const BackendURL = import.meta.env.VITE_BACKEND_URL


    //todo: function to get all the quizzes 
    const getAllQuizzes = async () => {
        try {
            const response = await fetch(`${BackendURL}/quiz/all-quizzes`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            const result = await response.json()
            const { success, message } = result

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    // funtion to get a single quiz by id in params
    const getQuizById = async (id) => {
        try {
            const response = await fetch(`${BackendURL}/quiz/${id}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            const result = await response.json()
            const { success, message, quiz } = result

            // console.log(quiz);
            setQuizInfo(quiz)

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    // function to get all the questions
    const getAllQuestions = async (id) => {
        try {
            const response = await fetch(`${BackendURL}/quiz/${id}/questions/admin`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            const result = await response.json()
            const { success, message, quiz } = result

            if (success) {
                console.log(quiz.questions);
                setQuestions(quiz.questions)
            }

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    // Function to get a single question by ID
    const getQuestionById = async (questionId) => {
        try {
            const response = await fetch(`${BackendURL}/quiz/question/${questionId}/admin`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            const result = await response.json();
            const { success, message, question } = result;

            if (success) {
                setQuestionInfo(question);
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    // Function to get all the usrers of website
    const getAllUsers = async () => {
        try {
            const response = await fetch(`${BackendURL}/user/users`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            const result = await response.json()
            const { success, message, users } = result

            // console.log(users);

            if (success) {
                setUsers(users)
            }

            if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }



    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
            navigate('/admin/home')
        }
    }, [])

    const value = { isLoggedIn, setIsLoggedIn, BackendURL, getAllQuizzes, getQuizById, quizInfo, getAllQuestions, questions, setQuestions, setQuizInfo, getQuestionById, questionInfo, setQuestionInfo, getAllUsers, users }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;