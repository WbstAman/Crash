import React, { useState } from "react";

const CustomSwitchButton = ({ initial = "demo", onChange }) => {
  const [mode, setMode] = useState(initial); // 'demo' or 'real'
  const isDemo = mode === "demo";

  const toggle = (next) => {
    const newMode = next ?? (isDemo ? "real" : "demo");
    setMode(newMode);
    if (onChange) onChange(newMode);
  };

  return (
    <div className="flex items-center space-x-4">

      {/* Demo Label */}
      <button
        type="button"
        aria-pressed={isDemo}
        onClick={() => toggle("demo")}
        className={`text-sm font-semibold transition-colors duration-150 focus:outline-none ${
          isDemo ? "text-gray-100" : "text-gray-400"
        }`}
      >
        Demo
      </button>

      {/* Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={!isDemo}
        onClick={() => toggle()}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
          }
        }}
        className="relative inline-flex items-center w-12 h-6 rounded-full bg-[#041520] focus:outline-none transition-colors duration-200"
      >
        {/* Knob */}
        <span
          className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-gray-300 shadow-sm transition-transform duration-200 ease-out ${
            isDemo ? "translate-x-0" : "translate-x-5"
          }`}
        />
      </button>

      {/* Real Label */}
      <button
        type="button"
        aria-pressed={!isDemo}
        onClick={() => toggle("real")}
        className={`text-sm font-semibold transition-colors duration-150 focus:outline-none ${
          !isDemo ? "text-gray-100" : "text-gray-400"
        }`}
      >
        Real
      </button>
    </div>
  );
};

export default CustomSwitchButton;
