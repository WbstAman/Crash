import React from "react";
import { FaUserFriends, FaEyeSlash } from "react-icons/fa";
import { IoChevronUpSharp } from "react-icons/io5";
import UserIcon from "../../../../assets/images/svgImages/UserIcon";
import HiddenIcon from "../../../../assets/images/svgImages/Hidden";

const rows = [
    { name: "shimakun", hidden: false, multiplier: "12.62×", amount: "$1,294.33", highlight: true },
    { name: "shimakun", hidden: false, multiplier: "12.62×", amount: "₹31,200...", highlight: true },
    { name: "shimakun", hidden: false, multiplier: "12.62×", amount: "₹31,200...", highlight: true },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "shimakun", hidden: false, multiplier: "12.62×", amount: "₹31,200...", highlight: true },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "shimakun", hidden: false, multiplier: "12.62×", amount: "₹31,200...", highlight: true },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
    { name: "Hidden", hidden: true, multiplier: "-", amount: "₹210.06", highlight: false },
];

const PlayersBetsPanel = ({ icon }) => {
    return (
        <div className="w-full max-w-sm rounded-2xl bg-[#071723] shadow-[0_12px_30px_rgba(0,0,0,0.7)]  text-sm text-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-2 py-[13px] border-b border-[#091B26] ">
                {/* Players count */}
                <div className="flex items-center gap-2">
                    <UserIcon className="text-md font-medium text-slate-300" />
                    <span className="font-semibold text-[13px]">363</span>
                </div>

                {/* Pot value */}
         
                <div className="flex justify-between items-center gap-2">
                    <span className="ml-2 flex items-center justify-center">
                        {typeof icon === "string" ? (
                            <img
                                src={icon}
                                alt="icon"
                                className="w-[18px] h-[18px] rounded-full"
                            />
                        ) : (
                            icon
                        )}
                    </span>
                    <span className="font-semibold">$4,128.32</span>
                    <IoChevronUpSharp className="text-xs text-slate-300" />

                </div>

            </div>

            {/* Body – scrollable list */}
            <div className="max-h-[276px] overflow-y-auto bets-scroll px-4 py-2 space-y-1">
                {rows.map((row, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 text-[13px] leading-tight"
                    >
                        {/* Name / Hidden */}
                        <div className="w-[40%] flex items-center gap-1 text-gray text-[14px] font-instrumentSans">
                            {row.hidden && (
                                <HiddenIcon className="text-xs text-slate-400" />
                            )}
                            <span
                                className={`truncate ${row.hidden ? "text-slate-400" : "text-slate-300"
                                    }`}
                            >
                                {row.hidden ? "Hidden" : row.name}
                            </span>
                        </div>

                        {/* Multiplier */}
                        <div className="w-[20%] text-white">
                            {row.multiplier}
                        </div>

                        {/* Amount */}
                        <div className="w-[40%] flex items-center justify-end gap-2">
                            {/* token pill */}
                            {/* <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00C46A] text-[#02130b] text-[11px] font-bold">
                                ₮
                            </span> */}

                                    {icon && (
            <span className="ml-2 flex items-center justify-center">
              {typeof icon === "string" ? (
                <img
                  src={icon}
                  alt="icon"
                  className="w-[18px] h-[18px] rounded-full"
                />
              ) : (
                icon
              )}
            </span>
          )}
                            <span
                                className={`truncate font-semibold ${row.highlight ? "text-[#E4FF00]" : "text-[#9AF7A6]"
                                    }`}
                            >
                                {row.amount}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayersBetsPanel;
