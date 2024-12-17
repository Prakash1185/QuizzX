import { Routes, Route, Navigate } from "react-router-dom"
import AdminHomePage from './pages/AdminHomePage';
import AdminAllQuizzesPage from './pages/AdminAllQuizzesPage';
import CreateQuizPage from './pages/CreateQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import ShowAllUsersPage from './pages/ShowAllUsersPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import AdminLoginPage from './pages/AdminLoginPage';
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import ManageQuestionPage from './pages/ManageQuestionPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import EditQuestionPage from './pages/EditQuestionPage';
import LeaderboardPage from "./pages/LeaderboardPage";

const App = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(AdminContext);

    return (
        <div>

            {/* Background Shapes with Blur */}
            {/* <div className="fixed  top-0 left-0 w-full h-full z-[-10] overflow-hidden">
                <div className="absolute top-28 left-2 w-40 h-40 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-0 -right-5 w-40 h-40 md:w-56 md:h-56 bg-Ngreen rounded-full blur-[85px] animate-pulse opacity-50"></div>
            </div> */}

            <Navbar />
            <div className="flex items-start">
                {isLoggedIn && <Sidebar />}
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/login" />} />
                    <Route path="/admin/home" element={<AdminHomePage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/all-quizzes" element={<AdminAllQuizzesPage />} />
                    <Route path="/admin/create-quiz" element={<CreateQuizPage />} />
                    <Route path="/admin/edit-quiz/:id" element={<EditQuizPage />} />
                    <Route path="/admin/users-list" element={<ShowAllUsersPage />} />
                    <Route path="/admin/quiz/:id/manage" element={<QuizDetailsPage />} />
                    <Route path="/admin/quiz/:id/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/admin/quiz/:id/manage-questions" element={<ManageQuestionPage />} />
                    <Route path="/admin/quiz/:id/add-question" element={<CreateQuestionPage />} />
                    <Route path="/admin/quiz/:id/edit-question/:qnId" element={<EditQuestionPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default App