import React from "react";
import './ProgressRingExample.css';

const circumference = 2 * Math.PI * 130; // ~817.123

const ProgressRingExample = ({ countdown = "00:30" }) => {
    return (
        <div className="relative  m-auto max-w-[300px] h-[300px]">
            <div className="wrapper">
                <svg
                    className="progress-svg"
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Your radial gradient (white -> neon yellow) */}
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

                        {/* ==== WHITE BORDER RING (BELOW PROGRESS) ==== */}
                        <circle
                            cx="150"
                            cy="150"
                            r="130"
                            stroke="white"
                            strokeWidth="4"
                            fill="none"
                            opacity="0.35"
                            stroke="#fff"
                        />

                        {/* ==== DARK SUBTLE TRACK ==== */}
                        <circle
                            cx="150"
                            cy="150"
                            r="130"
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="14"
                            fill="none"
                        />

                        {/* ==== YELLOW GRADIENT PROGRESS RING ==== */}
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

            <div className="aman absolute top-0 bottom-0 m-auto left-0 right-0 w-full h-full text-center flex justify-center items-center flex-col">
                <p className="text-2xl font-bold leading-[50px] text-primary text-orange-dark border-b border-white w-[150px] pb-3">
                    Next Round
                </p>
                <span className="text-[25px] font-normal">{`BETS ${countdown}`}</span>
            </div>


        </div>
    );
};

export default ProgressRingExample;
