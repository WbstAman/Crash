import { useState } from "react";
import { tabsMenu } from "../../../constant";
import InputField from "../../UI/InputFields/InputFields";
import { Tabs } from "../../UI/Tab/Tabs";
import usdt from "../../../assets/images/usdt.jpg"
import CustomButton from "../../UI/Buttons/CustomButton";
import PlayersBetsPanel from "./PlayersBetsPanel/PlayersBetsPanel";

const CrashSidebar = () => {
  const [tabs, setTabs] = useState(tabsMenu);

  const [betAmount, setBetAmount] = useState("0.00000000");
  const [cashoutAt, setCashoutAt] = useState("2.0");

  const handleHalf = () => {
    setBetAmount((prev) => {
      const num = Number(prev) || 0;
      return (num / 2).toFixed(8);
    });
  };

  const handleDouble = () => {
    setBetAmount((prev) => {
      const num = Number(prev) || 0;
      return (num * 2).toFixed(8);
    });
  };

  const increaseCashout = () => {
    setCashoutAt((prev) => (Number(prev) + 0.1).toFixed(1));
  };

  const decreaseCashout = () => {
    setCashoutAt((prev) => {
      const n = Number(prev) || 0;
      const next = n - 0.1;
      return (next < 1 ? 1 : next).toFixed(1); // don't go below 1.0
    });
  };
  return (
    <div className="game-sidebar">
      <Tabs tabs={tabs} setTabs={setTabs} />

      <div className="mt-[14px]">
        <div className="mb-3.5">
          <InputField
            label="Bet Amount"
            rightLabel="$0.00"
            value={betAmount}
            onChange={setBetAmount}
            icon={usdt}          // your token image
            showActions          // shows ½ & 2× buttons
            onHalf={handleHalf}
            onDouble={handleDouble}
          />
        </div>

        {/* 2️⃣ Cashout At row (with up / down arrows) */}

        <div className="mb-3.5">
          <InputField
            label="Cashout At"
            rightLabel="$0.00"
            value={cashoutAt}
            onChange={setCashoutAt}
            showIncrement        // shows ⌄ & ⌃ buttons
            onIncrement={increaseCashout}
            onDecrement={decreaseCashout}
          />
        </div>



        <div className="mb-3.5">
          <CustomButton title="Bet (Next Round)" />
        </div>

        <InputField
          label="Profit on Win"
          rightLabel="$0.00"
          icon={usdt}
          value={cashoutAt}
          onChange={setCashoutAt}
        // showIncrement        // shows ⌄ & ⌃ buttons
        // onIncrement={increaseCashout}
        // onDecrement={decreaseCashout}
        />

        <div className="mt-2">
          <PlayersBetsPanel
            icon={usdt}
          />
        </div>

      </div>

    </div>
  )
}
export default CrashSidebar