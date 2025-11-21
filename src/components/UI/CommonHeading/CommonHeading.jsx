import React from "react";
 
const CommonHeading= ({
  text,
  fontSize = "medium",
  color = "text-white",
}) => {
  let sizeClass = "";

  switch (fontSize) {
    case "small":
      sizeClass = "text-sm";
      break;
    case "medium":
      sizeClass = "text-md";
      break;
    case "large":
      sizeClass = "text-xl";
      break;
    default:
      sizeClass = "text-base";
  }

  return <h2 className={`${sizeClass} ${color} font-bold`}>{text}</h2>;
};

export default CommonHeading;

 