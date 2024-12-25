import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminHomePage from "./pages/AdminHomePage";
import AdminAllQuizzesPage from "./pages/AdminAllQuizzesPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import EditQuizPage from "./pages/EditQuizPage";
import ShowAllUsersPage from "./pages/ShowAllUsersPage";
import QuizDetailsPage from "./pages/QuizDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ManageQuestionPage from "./pages/ManageQuestionPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RefreshHandler from './components/RefreshHandler';

const App = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AdminContext);

    const PrivateRoute = ({ element }) => {
        return isLoggedIn ? element : <Navigate to={"/admin/login"} />;
    };

    return (
        <div>
            <RefreshHandler setIsLoggedIn={setIsLoggedIn} />
            <Navbar />
            <div className="flex items-start">
                {isLoggedIn && <Sidebar />}
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/login" />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/home" element={<PrivateRoute element={<AdminHomePage />} />} />
                    <Route path="/admin/all-quizzes" element={<PrivateRoute element={<AdminAllQuizzesPage />} />} />
                    <Route path="/admin/create-quiz" element={<PrivateRoute element={<CreateQuizPage />} />} />
                    <Route path="/admin/edit-quiz/:quizId" element={<PrivateRoute element={<EditQuizPage />} />} />
                    <Route path="/admin/users-list" element={<PrivateRoute element={<ShowAllUsersPage />} />} />
                    <Route path="/admin/quiz/:quizId/manage" element={<PrivateRoute element={<QuizDetailsPage />} />} />
                    <Route path="/admin/quiz/:quizId/leaderboard" element={<PrivateRoute element={<LeaderboardPage />} />} />
                    <Route path="/admin/quiz/:quizId/manage-questions" element={<PrivateRoute element={<ManageQuestionPage />} />} />
                    <Route path="/admin/quiz/:quizId/add-question" element={<PrivateRoute element={<CreateQuestionPage />} />} />
                    <Route path="/admin/quiz/:quizId/edit-question/:questionId" element={<PrivateRoute element={<EditQuestionPage />} />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <ToastContainer theme="dark" />
            </div>
        </div>
    );
};

export default App;
