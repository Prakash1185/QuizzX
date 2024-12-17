import { FaBookOpenReader, FaPencil, FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

export const ReadLogoBox = ({ text = "text" }) => {
    return (
        <div className="flex items-center gap-3 bg-finalDark border-gray-500 border-opacity-50 border-dashed  border py-4 px-5 rounded-lg">
            <FaBookOpenReader className="text-Ngreen text-2xl" />
            <h1 className="text-lg">{text}</h1>
        </div>
    )
}
export const EditLogoBox = ({ text = "text" }) => {
    return (
        <div className="flex items-center gap-3 bg-finalDark border-gray-500 border-opacity-50 border-dashed  border py-4 px-5 rounded-lg">
            <FaPenToSquare className="text-Ngreen text-2xl" />
            <h1 className="text-lg">{text}</h1>
        </div>
    )
}
export const DeleteLogoBox = ({ text = "text" }) => {
    return (
        <div className="flex items-center gap-3 bg-finalDark border-gray-500 border-opacity-50 border-dashed  border py-4 px-5 rounded-lg">
            <FaRegTrashCan className="text-Ngreen text-2xl" />
            <h1 className="text-lg">{text}</h1>
        </div>
    )
}
export const CreateLogoBox = ({ text = "text" }) => {
    return (
        <div className="flex items-center gap-3 bg-finalDark border-gray-500 border-opacity-50 border-dashed  border py-4 px-5 rounded-lg">
            <FaPencil className="text-Ngreen text-2xl" />
            <h1 className="text-lg">{text}</h1>
        </div>
    )
}
