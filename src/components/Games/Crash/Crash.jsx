
import GameHeader from "../GameHeader/GameHeader"
import CrashGame from "./CrashContent"
import CrashSidebar from "./CrashSidebar"
import "./Crash.css"
const Crash = () => {
  return (
    <div className='carsh-game'>
      <div className="game-grid">
        <GameHeader gameName="Crash" />
        <div className="game-subgrid">
          {/* <CrashSidebar /> */}
          <CrashGame />
        </div>
      </div>
    </div>
  )
}

export default Crash