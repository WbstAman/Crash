import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
 

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
};
// ////////////////////////////////////////


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const BettingPanel = ({ balance, currentBet, gameState, multiplier, onPlaceBet, onCashout }) => {
//   const [betAmount, setBetAmount] = useState("10");
//   const [autoCashout, setAutoCashout] = useState("");

//   const handlePlaceBet = () => {
//     const amount = parseFloat(betAmount);
//     const auto = autoCashout ? parseFloat(autoCashout) : null;
    
//     if (amount > 0 && amount <= balance) {
//       onPlaceBet(amount, auto);
//     }
//   };

//   const potentialWin = currentBet ? (currentBet.amount * multiplier).toFixed(2) : "0.00";
//   const canPlaceBet = gameState === "waiting" && !currentBet && parseFloat(betAmount) > 0 && parseFloat(betAmount) <= balance;
//   const canCashout = gameState === "running" && currentBet;

//   return (
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-2xl">Place Your Bet</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <label className="text-sm text-muted-foreground mb-2 block">Balance</label>
//           <div className="text-2xl font-bold text-primary">${balance.toFixed(2)}</div>
//         </div>

//         {!currentBet && (
//           <>
//             <div>
//               <label className="text-sm text-muted-foreground mb-2 block">Bet Amount</label>
//               <Input
//                 type="number"
//                 value={betAmount}
//                 onChange={(e) => setBetAmount(e.target.value)}
//                 disabled={gameState === "running"}
//                 className="text-lg"
//                 min="0"
//                 step="1"
//               />
//               <div className="flex gap-2 mt-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setBetAmount((parseFloat(betAmount) / 2).toFixed(2))}
//                   disabled={gameState === "running"}
//                 >
//                   1/2
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setBetAmount((parseFloat(betAmount) * 2).toFixed(2))}
//                   disabled={gameState === "running"}
//                 >
//                   2x
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setBetAmount(balance.toFixed(2))}
//                   disabled={gameState === "running"}
//                 >
//                   Max
//                 </Button>
//               </div>
//             </div>

//             <div>
//               <label className="text-sm text-muted-foreground mb-2 block">
//                 Auto Cashout (Optional)
//               </label>
//               <Input
//                 type="number"
//                 value={autoCashout}
//                 onChange={(e) => setAutoCashout(e.target.value)}
//                 placeholder="e.g., 2.00"
//                 disabled={gameState === "running"}
//                 className="text-lg"
//                 min="1.01"
//                 step="0.01"
//               />
//             </div>

//             <Button
//               className="w-full text-lg h-12"
//               onClick={handlePlaceBet}
//               disabled={!canPlaceBet}
//             >
//               Place Bet ${betAmount}
//             </Button>
//           </>
//         )}

//         {currentBet && (
//           <div className="space-y-4">
//             <div className="bg-muted p-4 rounded-lg space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">Bet Amount:</span>
//                 <span className="font-semibold">${currentBet.amount.toFixed(2)}</span>
//               </div>
//               {currentBet.autoCashout && (
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Auto Cashout:</span>
//                   <span className="font-semibold">{currentBet.autoCashout.toFixed(2)}x</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">Current Multiplier:</span>
//                 <span className="font-bold text-success">{multiplier.toFixed(2)}x</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
//                 <span>Potential Win:</span>
//                 <span className="text-success">${potentialWin}</span>
//               </div>
//             </div>

//             <Button
//               className="w-full text-lg h-12 bg-gradient-success hover:opacity-90"
//               onClick={onCashout}
//               disabled={!canCashout}
//             >
//               Cash Out ${potentialWin}
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };
