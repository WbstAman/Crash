import React from "react";

const CustomButton = ({
  title = "Click Me",
  onClick,
  icon = null,       // 👈 optional icon
  variant = "default",
  type = "button",
  className = "",
  disabled = false,
  size = "auto",
}) => {
  // tailwind style mappings
  const variantStyles = {
    default: "bg-yellow-dark text-black",
    primary: "bg-gray-light text-white",
    secondary: "bg-green-600 hover:bg-green-700 text-white",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ maxWidth: size !== "auto" ? `${size}px` : "auto" }}
      className={`
        flex items-center justify-center gap-2
        text-black cursor-pointer
        rounded-lg p-2.5 font-bold w-full transition
        ${disabled ? "bg-gray-400 cursor-not-allowed" : variantStyles[variant]}
        ${className}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}  {/* 👈 Render icon only if passed */}
      {title}
    </button>
  );
};

export default CustomButton;




// border-radius: 8px;
// background: #EAFF01;
// box-shadow: 0px 2px 4px -2px #0000001A;

// box-shadow: 0px 4px 6px -1px #0000001A;
