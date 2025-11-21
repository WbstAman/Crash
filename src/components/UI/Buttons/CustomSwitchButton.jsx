 import React, { useState } from "react";

const previewImage = "/mnt/data/cefce9dd-956d-47f2-808f-9f34500207a4.png";

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
      {/* optional preview (small) */}
      <img
        src={previewImage}
        alt="preview"
        className="w-40 h-8 object-contain rounded-sm shadow-sm"
        style={{ filter: "contrast(0.9)" }}
      />

      <div className="flex items-center gap-3">
        <button
          aria-pressed={isDemo}
          onClick={() => toggle("demo")}
          className={`text-sm font-semibold transition-colors duration-150 ${
            isDemo ? "text-white" : "text-gray-400"
          }`}
        >
          Demo
        </button>

        {/* toggle switch */}
        <button
          role="switch"
          aria-checked={isDemo ? "false" : "true"}
          onClick={() => toggle()}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggle();
            }
          }}
          className="relative w-16 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
          style={{ background: isDemo ? "#f8ff00" : "#111213" }}
        >
          {/* track (we use pseudo look via inner element) */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              // keep neon look for active, dark for inactive
              background: isDemo ? "#f8ff00" : "#111213",
              boxShadow: isDemo ? "0 0 22px rgba(248,255,0,0.35)" : "none",
              transition: "background 200ms ease, box-shadow 200ms ease",
            }}
          />

          {/* knob */}
          <span
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md"
            style={{
              left: isDemo ? "6px" : "calc(100% - 6px - 24px)",
              transform: "translateY(-50%)",
              background: isDemo ? "#0b0b0b" : "#f8ff00",
              transition: "left 240ms cubic-bezier(.2,.8,.2,1), background 200ms ease",
              boxShadow: isDemo ? "0 2px 6px rgba(0,0,0,0.6)" : "0 2px 6px rgba(0,0,0,0.25)",
            }}
          />
        </button>

        <button
          aria-pressed={!isDemo}
          onClick={() => toggle("real")}
          className={`text-sm font-semibold transition-colors duration-150 ${
            !isDemo ? "text-white" : "text-gray-400"
          }`}
        >
          Real
        </button>
      </div>
    </div>
  );
};

export default CustomSwitchButton;
