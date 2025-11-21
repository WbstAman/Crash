import { useEffect, useState } from "react";
import CrashGraph from "./CrashGame/components/CrashGraph";

const CrashContent = () => {
  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(null);
  const [gameState, setGameState] = useState("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashPoint, setCrashPoint] = useState(null);
  const [history, setHistory] = useState([]);
  const [countdown, setCountdown] = useState(5);

  // Generate random crash point between 1.01 and 10.00
  const generateCrashPoint = () => {
    const random = Math.random();
    if (random < 0.5) return (1 + Math.random() * 2).toFixed(2);
    if (random < 0.8) return (2 + Math.random() * 3).toFixed(2);
    if (random < 0.95) return (5 + Math.random() * 5).toFixed(2);
    return (10 + Math.random() * 10).toFixed(2);
  };

  // Start new round
  useEffect(() => {

    if (gameState === "waiting" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (gameState == "crashed" && countdown === 0) {
      setMultiplier(1.0);
    }

    if (gameState === "waiting" && countdown === 0) {
      const newCrashPoint = generateCrashPoint();
      setCrashPoint(parseFloat(newCrashPoint));
      // setCrashPoint(parseFloat(10));
      setGameState("running");
      setMultiplier(1.0);
    }
  }, [gameState, countdown]);

  // Update multiplier during game
  useEffect(() => {
    if (gameState !== "running") return;

    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const next = prev + 0.01;
        if (next >= crashPoint) {
          setGameState("crashed");
          setHistory((prev) => [parseFloat(crashPoint.toFixed(2)), ...prev.slice(0, 19)]);

          // Auto cash out failed bets
          if (currentBet) {
            setCurrentBet(null);
          }

          // Start new round after 2 seconds
          setTimeout(() => {
            setGameState("waiting");
            setCountdown(5);
          }, 2000);

          return parseFloat(crashPoint.toFixed(2));
        }
        return parseFloat(next.toFixed(2));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, crashPoint, currentBet]);

  const handlePlaceBet = (amount, autoCashout) => {
    if (balance < amount) return;

    setBalance(balance - amount);
    setCurrentBet({ amount, autoCashout });
  };

  const handleCashout = () => {
    if (!currentBet || gameState !== "running") return;

    const winnings = currentBet.amount * multiplier;
    setBalance(balance + winnings);
    setCurrentBet(null);
  };

  // Auto cashout
  useEffect(() => {
    if (currentBet?.autoCashout && multiplier >= currentBet.autoCashout && gameState === "running") {
      handleCashout();
    }
  }, [multiplier, currentBet, gameState]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 max-w-[794px] w-full m-auto mt-[50px] ">
      <div className="max-w-7xl mx-auto crash-graph-container p-6 rounded-md">

        <div className="relative">
          <div className="lg:col-span-2">
            {gameState === "waiting" && (
              <div className="mt-4 text-center absolute top-3 left-0 right-0 m-auto">
                <span className="text-[50px] font-bold">{`0:0${countdown}`}</span>
                <p className="text-xl font-normal text-primary">
                  Waiting for EOS block to be mined...
                </p>
              </div>
            )}
            <CrashGraph multiplier={multiplier} gameState={gameState} history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrashContent;
