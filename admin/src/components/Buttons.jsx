export const AdminBadge = () => {
    return (
        <button className="text-dark bg-dark bg-opacity-20 border border-dark rounded-full text-xs px-2 py-0.5 ">
            Admin
        </button>
    )
}

export const Button = ({text}) => {
    return (
        <button className="bg-dark py-3 px-[5rem] text-center text-lg text-white rounded-md font-semibold cursor-pointer w-full">
           {text}
        </button>
    )
}

export const QuizActions = ({text}) => {
    return (
        <button className="bg-dark hover:bg-opacity-95 transition-all duration-200 py-3 px-10 text-lg text-white rounded-md font-semibold">
            {text}
        </button>
    )
}
export const DeleteQuiz = ({text}) => {
    return (
        <button className="border  border-red-600 text-red-600 hover:bg-red-600 transition-all duration-200 py-2 px-10 text-lg hover:text-white rounded-md font-semibold">
            {text}
        </button>
    )
}