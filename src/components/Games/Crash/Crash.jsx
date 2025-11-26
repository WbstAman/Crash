
import GameHeader from "../GameHeader/GameHeader"
import CrashGame from "./CrashContent"
import CrashSidebar from "./CrashSidebar"
import "./Crash.css"
const Crash = () => {
  return (
    <div className="bg-[#132633] rounded-xl" style={{ padding: "6px 6px 12px 12px" }}>
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