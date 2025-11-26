import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const InputField = ({
  label = "",
  rightLabel = "",
  value,
  onChange,
  icon,
  showActions = false,
  showIncrement = false,
  onHalf,
  onDouble,
  onIncrement,
  onDecrement,
  disabled = false,
  inputType = "number",
}) => {
  return (
    <div className="inputFieldContainer w-full">
      {/* Labels Row */}
      {(label || rightLabel) && (
        <div className="flex justify-between items-center">
          <label className="text-gray text-[14px] font-bold font-instrumentSans leading-[17px]">
            {label}
          </label>
          <label className="text-gray text-[14px] font-bold font-instrumentSans leading-[17px]">
            {rightLabel}
          </label>
        </div>
      )}

      <div className="mt-2 flex items-center rounded-xl overflow-hidden bg-primary-gray
          shadow-[0_6px_16px_rgba(0,0,0,0.6)] border border-[#466273]">

        {/* Input + Icon */}
        <div className="flex items-center bg-[#091B26] px-3 flex-1">
          <input
            type={inputType}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-2 py-2.5 text-white font-semibold outline-none border-none bg-transparent font-instrumentSans text-[14px] w-full"/>

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
        </div>

        {/* Action Buttons if needed */}
        {showActions && (
          <>
            <button
              type="button"
              onClick={onHalf}
              className="px-4 py-2 font-bold text-white text-sm bg-[#0F2738] hover:bg-[#123248] transition"
            >
              ½
            </button>
            <div className="w-[2px] h-6 bg-[#1b3a4d]"></div>
            <button
              type="button"
              onClick={onDouble}
              className="px-4 py-2 font-bold text-white text-sm bg-[#0F2738] hover:bg-[#123248] transition"
            >
              2×
            </button>
          </>
        )}

        {/* Increment Controls if needed */}
        {showIncrement && (
          <>
            <button
              type="button"
              onClick={onDecrement}
              className="px-3 py-2 font-bold text-white text-md bg-[#0F2738] hover:bg-[#123248] transition"
            >
                <IoIosArrowDown/>

            </button>
            <button
              type="button"
              onClick={onIncrement}
              className="px-3 py-2 font-bold text-white text-md bg-[#0F2738] hover:bg-[#123248] transition"
            >
                <IoIosArrowUp/>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
