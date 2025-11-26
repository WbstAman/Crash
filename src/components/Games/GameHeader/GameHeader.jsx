import { MdStarOutline } from "react-icons/md"
import CommonHeading from "../../UI/CommonHeading/CommonHeading"
import { AiOutlineExpand } from "react-icons/ai"
import CustomSwitchButton from "../../UI/Buttons/CustomSwitchButton"

// import "./GameHeader.css"
const GameHeader = ({ gameName }) => {
  return (
    <div className="flex justify-between items-center pt-3 pr-2">

          <div className="flex justify-start items-center gap-2 ">
             <AiOutlineExpand className="text-white text-xl mr-4 " />
              <CommonHeading text={gameName} />
          </div>

      <CustomSwitchButton/>

    </div>
  )
}

export default GameHeader