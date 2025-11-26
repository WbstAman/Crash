import { useState } from "react";
 

export const BettingPanel = ({
  balance,
  currentBet,
  gameState,
  currentMultiplier,
  onPlaceBet,
  onCashout,
}) => {
  const [betAmount, setBetAmount] = useState("10");
  const [autoCashout, setAutoCashout] = useState("");

  const handlePlaceBet = () => {
    const amount = parseFloat(betAmount);
    const auto = autoCashout ? parseFloat(autoCashout) : undefined;
    
    if (amount > 0 && amount <= balance) {
      onPlaceBet(amount, auto);
    }
  };

  const potentialWin = currentBet ? currentBet * currentMultiplier : 0;
  const canPlaceBet = gameState === "waiting" && !currentBet;
  const canCashout = gameState === "running" && currentBet;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      {/* Balance Display */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Balance</p>
        <p className="text-3xl font-bold text-primary glow-primary">${balance.toFixed(2)}</p>
      </div>

      {/* Bet Amount */}
      <div className="space-y-2">
        <label htmlFor="betAmount">Bet Amount</label>
        <input
          id="betAmount"
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          disabled={!canPlaceBet}
          className="text-lg font-semibold"
          placeholder="10.00"
        />
        <div className="flex gap-2">
          {[10, 50, 100, 500].map((amount) => (
            <button
              key={amount}
              variant="secondary"
              size="sm"
              onClick={() => setBetAmount(amount.toString())}
              disabled={!canPlaceBet}
              className="flex-1"
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Auto Cashout */}
      <div className="space-y-2">
        <label htmlFor="autoCashout">Auto Cashout (Optional)</label>
        <input
          id="autoCashout"
          type="number"
          value={autoCashout}
          onChange={(e) => setAutoCashout(e.target.value)}
          disabled={!canPlaceBet}
          placeholder="2.00x"
          step="0.1"
        />
      </div>

      {/* Action Button */}
      {canPlaceBet && (
        <button
          onClick={handlePlaceBet}
          className="w-full h-14 text-lg font-bold bg-gradient-primary glow-primary"
          size="lg"
        >
          Place Bet
        </button>
      )}

      {canCashout && (
        <div className="space-y-4">
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Potential Win</p>
            <p className="text-2xl font-bold text-success glow-success">
              ${potentialWin.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onCashout}
            className="w-full h-14 text-lg font-bold bg-gradient-success glow-success"
            size="lg"
          >
            Cash Out @ {currentMultiplier.toFixed(2)}x
          </button>
        </div>
      )}

      {gameState === "crashed" && currentBet && (
        <div className="bg-destructive/20 border border-destructive rounded-lg p-4 text-center">
          <p className="text-destructive font-bold">CRASHED!</p>
          <p className="text-sm text-muted-foreground">Better luck next time</p>
        </div>
      )}
    </div>
  );
}; W