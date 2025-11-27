import React from "react";
import "./ProgressRingExample.css";

const circumference = 2 * Math.PI * 130; // ~817.123

const ProgressRingExample = ({ countdown = "00:30" }) => {
  return (
    <div
      className="
        relative mx-auto
        w-full max-w-[260px] sm:max-w-[300px]
        aspect-square
      "
    >
      <div className="wrapper">
        <svg
          className="progress-svg"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* radial gradient (white -> neon yellow) */}
            <radialGradient id="ringRadialGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(234,255,0,1)" />
            </radialGradient>

            {/* glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* rotate SVG so stroke starts at top */}
          <g transform="rotate(-90 150 150)">
            {/* white outer border ring */}
            <circle
              cx="150"
              cy="150"
              r="130"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
              opacity="0.35"
            />

            {/* dark track */}
            <circle
              cx="150"
              cy="150"
              r="130"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="14"
              fill="none"
            />

            {/* progress ring */}
            <circle
              className="progress-ring"
              cx="150"
              cy="150"
              r="130"
              fill="none"
              stroke="url(#ringRadialGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{ filter: "url(#glow)" }}
            />
          </g>
        </svg>
      </div>

      {/* center content */}
      <div className="center-text aman">
        <p className="text-xl leading-[35px] pb-2 sm:text-2xl font-bold sm:leading-[50px] text-orange-dark border-b border-white w-[150px] sm:pb-3">
          Next Round
        </p>
        <span className="text-md2 sm:text-[25px] font-normal">{`BETS ${countdown}`}</span>
      </div>
    </div>
  );
};

export default ProgressRingExample;
