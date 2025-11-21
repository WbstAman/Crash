import { MdStarOutline } from "react-icons/md"
import CommonHeading from "../../UI/CommonHeading/CommonHeading"
import { AiOutlineExpand } from "react-icons/ai"

// import "./GameHeader.css"
const GameHeader = ({ gameName }) => {
  return (
    <div className="flex justify-between items-center">
      <CommonHeading text={gameName} />

      <div className="flex justify-between items-center border-r border-gray-dark">
        <MdStarOutline className="text-white text-xl" />
        <CommonHeading text="Add Favorite" />
        <AiOutlineExpand className="text-white text-xl mx-4 " />
      </div>

    </div>
  )
}

export default GameHeader