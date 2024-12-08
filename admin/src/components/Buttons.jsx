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