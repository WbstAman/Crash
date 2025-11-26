import { useState, useEffect, useCallback } from "react";
import { CrashGraph } from "@/components/CrashGraph";
import { BettingPanel } from "@/components/BettingPanel";
import { GameHistory } from "@/components/GameHistory";
import { toast } from "sonner";

const CrashGame = () => {
  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(null);
  const [autoCashout, setAutoCashout] = useState(null);
  const [gameState, setGameState] = useState("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashPoint, setCrashPoint] = useState(2.0);
  const [history, setHistory] = useState([]);
  const [countdown, setCountdown] = useState(5);

  // Generate random crash point between 1.01 and 10.00
  const generateCrashPoint = useCallback(() => {
    const random = Math.random();
    if (random < 0.5) return 1.01 + Math.random() * 1.5; // 50% chance of 1.01-2.51
    if (random < 0.8) return 2.5 + Math.random() * 2.5; // 30% chance of 2.5-5.0
    return 5 + Math.random() * 5; // 20% chance of 5-10
  }, []);

  // Start new game
  const startGame = useCallback(() => {
    const newCrashPoint = generateCrashPoint();
    setCrashPoint(newCrashPoint);
    setMultiplier(1.0);
    setGameState("running");
    toast.info("Game started! 🚀");
  }, [generateCrashPoint]);

  // End game (crash)
  const endGame = useCallback(() => {
    setGameState("crashed");
    setHistory((prev) => [
      { multiplier: crashPoint, timestamp: Date.now() },
      ...prev.slice(0, 49),
    ]);

    if (currentBet) {
      toast.error(`Crashed at ${crashPoint.toFixed(2)}x! You lost $${currentBet.toFixed(2)}`);
      setCurrentBet(null);
      setAutoCashout(null);
    }

    // Start countdown for next game
    setCountdown(5);
  }, [crashPoint, currentBet]);

  // Handle cashout
  const handleCashout = useCallback(() => {
    if (currentBet && gameState === "running") {
      const winAmount = currentBet * multiplier;
      setBalance((prev) => prev + winAmount);
      toast.success(`Cashed out at ${multiplier.toFixed(2)}x! Won $${winAmount.toFixed(2)}`, {
        className: "bg-success text-success-foreground",
      });
      setCurrentBet(null);
      setAutoCashout(null);
    }
  }, [currentBet, gameState, multiplier]);

  // Place bet
  const handlePlaceBet = useCallback(
    (amount, auto) => {
      if (amount > balance) {
        toast.error("Insufficient balance!");
        return;
      }

      setBalance((prev) => prev - amount);
      setCurrentBet(amount);
      setAutoCashout(auto || null);
      toast.success(`Bet placed: $${amount.toFixed(2)}`);
    },
    [balance]
  );

  // Game loop - update multiplier
  useEffect(() => {
    if (gameState !== "running") return;

    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const increment = 0.01 + (prev - 1) * 0.02; // Accelerating increase
        const newMultiplier = prev + increment;

        // Check for crash
        if (newMultiplier >= crashPoint) {
          clearInterval(interval);
          setTimeout(() => endGame(), 100);
          return crashPoint;
        }

        // Check for auto cashout
        if (autoCashout && newMultiplier >= autoCashout && currentBet) {
          handleCashout();
        }

        return newMultiplier;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameState, crashPoint, autoCashout, currentBet, endGame, handleCashout]);

  // Countdown timer between games
  useEffect(() => {
    if (gameState !== "crashed" && gameState !== "waiting") return;

    if (countdown === 0) {
      startGame();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, gameState, startGame]);

  // Initial game start
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gameState === "waiting") {
        startGame();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-glow-primary">
           Crash Game
          </h1>
          <p className="text-muted-foreground">
            Place your bet and cash out before the crash!
          </p>
          {(gameState === "waiting" || gameState === "crashed") && (
            <p className="text-xl font-bold text-primary">
              Next game in: {countdown}s
            </p>
          )}
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph */}
          <div className="lg:col-span-2">
            <div className="h-[500px]">
              <CrashGraph
                multiplier={multiplier}
                gameState={gameState}
                history={history.map((h) => h.multiplier)}
              />
            </div>
          </div>

          {/* Betting Panel */}
          <div>
            <BettingPanel
              balance={balance}
              currentBet={currentBet}
              gameState={gameState}
              currentMultiplier={multiplier}
              onPlaceBet={handlePlaceBet}
              onCashout={handleCashout}
            />
          </div>
        </div>

        {/* History */}
        <div className="max-w-md mx-auto">
          <GameHistory history={history} />
        </div>
      </div>
    </div>
  );
};

export default CrashGame;
