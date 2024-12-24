import { Link } from "react-router-dom"

export const AdminBadge = () => {
    return (
        <button className=" bg-yellow-800 bg-opacity-50 font-light border border-yellow-600 border-opacity-50  text-yellow-300 rounded-full text-sm px-2.5 py-0.5 ">
            Admin
        </button>
    )
}

export const GreenBadge = ({ text }) => {
    return (
        <button className=" bg-green-800 bg-opacity-50 text-green-300 rounded-md text-sm font-medium tracking-wide px-3.5 py-1 ">
            {text}
        </button>
    )
}
export const BlueBadge = ({ text }) => {
    return (
        <button className=" bg-blue-800 bg-opacity-50 text-blue-300 rounded-md text-sm font-medium tracking-wide px-3.5 py-1 ">
            {text}
        </button>
    )
}
export const RedBadge = ({ text }) => {
    return (
        <button className=" bg-red-800 bg-opacity-50 text-red-300 rounded-md text-xs font-medium tracking-wide px-3.5 py-1 ">
            {text}
        </button>
    )
}
export const PurpleBadge = ({ text }) => {
    return (
        <button className=" bg-purple-800 bg-opacity-50 text-purple-300 rounded-md text-sm font-medium tracking-wide px-3.5 py-1 ">
            {text}
        </button>
    )
}
export const OrangeBadge = ({ text }) => {
    return (
        <button className=" bg-orange-800 bg-opacity-50 text-orange-300 rounded-md text-sm font-medium tracking-wide px-3.5 py-1 ">
            {text}
        </button>
    )
}


export const Button = ({ text }) => {
    return (
        <button className="bg-dark py-3 px-[5rem] text-center text-lg text-white rounded-md font-semibold cursor-pointer w-full">
            {text}
        </button>
    )
}

export const QuizActions = ({ text }) => {
    return (
        <button className="bg-dark hover:bg-opacity-95 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold">
            {text}
        </button>
    )
}

export const ManageQuiz = ({ text, id }) => {
    return (
        <Link to={`/admin/quiz/${id}/manage`}>
            <button className="bg-blue-700  hover:bg-blue-800 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold w-full  sm:w-[22rem]">
                {text}
            </button>
        </Link>
    )
}
export const ActivateQuiz = ({ text }) => {
    return (
        <button className="bg-green-700  hover:bg-green-800 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold">
            {text}
        </button>
    )
}

export const Leaderboard = ({ text, id }) => {
    return (
        <Link to={`/admin/quiz/${id}/leaderboard`}>
            <button className="bg-purple-700  hover:bg-purple-800 transition-all duration-200 py-3 px-10 text-lg text-white w-[22rem] rounded-md font-semibold">
                {text}
            </button>
        </Link>
    )
}


export const DeleteQuiz = ({ text }) => {
    return (
        <button className="border  border-red-600 text-red-600 hover:bg-red-600 transition-all duration-200 py-2 px-10 text-lg hover:text-white rounded-md font-semibold">
            {text}
        </button>
    )
}

export const LoginButton = () => {
    return (
        <button className='text-lg font-medium cursor-pointer bg-Ngreen hover:bg-Dgreen transition-all duration-300 px-5 sm:px-7 sm:py-2 py-1.5 rounded-md'>
            Login
        </button>
    )
}

export const FormLoginButton = () => {
    return (
        <button className='text-lg font-medium cursor-pointer bg-Ngreen hover:bg-Dgreen transition-all duration-300 w-full px-2
        py-2 rounded-md'>
            Login
        </button>
    )
}

export const LogoutButton = () => {
    return (
        <button  className='text-lg font-medium cursor-pointer bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-2 rounded-md'>
            Logout
        </button>
    )
}