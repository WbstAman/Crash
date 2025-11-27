
import GameHeader from "../GameHeader/GameHeader"
import CrashGame from "./CrashContent"
import CrashSidebar from "./CrashSidebar"
import "./Crash.css"
const Crash = () => {
  return (
    <div className="bg-[#132633] max-w-[1140px] w-full m-auto rounded-xl p-4 md2:pt-1.5 md2:pr-1.5 md2:pb-3 md2:pl-3 " >
    <div className="game-grid">
        <div className="game-subgrid">
          <CrashSidebar />
          <CrashGame />
        </div>
      </div>
      <GameHeader gameName="Crash" />

    </div>
  )
}

export default Crash