 

import ScrollArea from "./ScrollArea";
 
export const GameHistory = ({ history }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-bold mb-4">Game History</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No games played yet
            </p>
          )}
          {history.map((game, index) => {
            const isLow = game.multiplier < 2;
            const isMedium = game.multiplier >= 2 && game.multiplier < 5;
            const isHigh = game.multiplier >= 5;

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isLow
                    ? "bg-destructive/10 border border-destructive/20"
                    : isMedium
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-success/10 border border-success/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isLow
                        ? "bg-destructive"
                        : isMedium
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  />
                  <span className="text-sm text-muted-foreground">
                    #{history.length - index}
                  </span>
                </div>
                <span
                  className={`text-lg font-bold ${
                    isLow
                      ? "text-destructive"
                      : isMedium
                      ? "text-primary"
                      : "text-success"
                  }`}
                >
                  {game.multiplier.toFixed(2)}x
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};


// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export const GameHistory = ({ history }) => {
//   return (
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle>Game History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[300px]">
//           <div className="grid grid-cols-5 gap-2">
//             {history.map((crash, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded text-center font-semibold ${
//                   crash < 2
//                     ? "bg-destructive/20 text-destructive"
//                     : crash < 5
//                     ? "bg-primary/20 text-primary"
//                     : "bg-success/20 text-success"
//                 }`}
//               >
//                 {crash.toFixed(2)}x
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );