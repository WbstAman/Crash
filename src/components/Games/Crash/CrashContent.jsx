import { useEffect, useState } from "react";
import CrashGraph from "./CrashGame/components/CrashGraph";
import ProgressRingExample from "./CrashGame/components/ProgressRingExample/ProgressRingExample";

const CrashContent = () => {
  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(null);
  const [gameState, setGameState] = useState("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashPoint, setCrashPoint] = useState(null);
  const [history, setHistory] = useState([]);
  const [countdown, setCountdown] = useState(3);

  const generateCrashPoint = () => {
    const random = Math.random();
    if (random < 0.5) return (1 + Math.random() * 2).toFixed(2);
    if (random < 0.8) return (2 + Math.random() * 3).toFixed(2);
    if (random < 0.95) return (5 + Math.random() * 5).toFixed(2);
    return (10 + Math.random() * 10).toFixed(2);
  };

  useEffect(() => {
    if (gameState === "waiting" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (gameState === "crashed" && countdown === 0) {
      setMultiplier(1.0);
    }

    if (gameState === "waiting" && countdown === 0) {
      const newCrashPoint = generateCrashPoint();
      setCrashPoint(parseFloat(newCrashPoint));
      setGameState("running");
      setMultiplier(1.0);
    }
  }, [gameState, countdown]);

useEffect(() => {
  if (gameState !== "running") return;

  const interval = setInterval(() => {
    setMultiplier((prev) => {
      const next = prev + 0.01;

      if (next >= crashPoint) {
        setTimeout(() => {
          setGameState("crashed");
        }, 200);
        setHistory((prevHistory) => [
          parseFloat(crashPoint.toFixed(2)),
          ...prevHistory.slice(0, 19),
        ]);

        if (currentBet) {
          setCurrentBet(null);
        }

        // ⬇️ Hold explosion for 1 second, then go to waiting (ProgressRingExample)
        setTimeout(() => {
          setGameState("waiting");
          setCountdown(3);
        }, 2000); // 1 second instead of 2000

        return parseFloat(crashPoint.toFixed(2));
      }

      return parseFloat(next.toFixed(2));
    });
  }, 30);

  return () => clearInterval(interval);
}, [gameState, crashPoint, currentBet]);

  const handlePlaceBet = (amount, autoCashout) => {
    if (balance < amount) return;
    setBalance((b) => b - amount);
    setCurrentBet({ amount, autoCashout });
  };

  const handleCashout = () => {
    if (!currentBet || gameState !== "running") return;
    const winnings = currentBet.amount * multiplier;
    setBalance((b) => b + winnings);
    setCurrentBet(null);
  };

  useEffect(() => {
    if (
      currentBet?.autoCashout &&
      multiplier >= currentBet.autoCashout &&
      gameState === "running"
    ) {
      handleCashout();
    }
  }, [multiplier, currentBet, gameState]);

  return (
    // <div className="mi bg-background text-foreground p-4 max-w-[834px] w-full mx-auto h-[699px]">
    <div className="mi bg-background text-foreground px-4 max-w-[834px] w-full mx-auto h-[699px]">
      <div className="max-w-7xl mx-auto crash-graph-container p-6 rounded-md h-full">
        <div className="relative h-full flex items-center justify-center">
          {/* Just the ring for now */}
 
          {/* When you want to swap to graph: */}
    
     {/* <CrashGraph
              multiplier={multiplier}
              gameState={gameState}
              history={history}
            /> */}
          {gameState === "waiting" ? (
            <ProgressRingExample countdown={countdown} />
          ) : (
            <CrashGraph
              multiplier={multiplier}
              gameState={gameState}
              history={history}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CrashContent;
