import React, { useState } from "react";
import { otherMenu } from "../../../constant";

const SideBarBottomMenu = () => {
  const [active, setActive] = useState(""); // track active menu

  return (
    <div>
      {otherMenu.map((item, index) => {
        const isActive = active === item.value;

        return (
          <div key={index} className="mt-2">
            <div
              onClick={() => setActive(item.value)}
              className={`
                group flex items-center cursor-pointer py-3 px-3 transition-all rounded-md
                hover:bg-yellow-dark
                ${isActive ? "bg-yellow-dark" : ""}
              `}
            >
              {/* ICON WRAPPER */}
              <div
                className={`
                  w-6 h-6 flex justify-center items-center rounded-full mr-3 transition-all
                  ${isActive ? "bg-white/80" : "bg-primary"}
                `}
              >
                {/**
                 * Clone icon to apply dynamic color
                 */}
                {item.icon &&
                  React.cloneElement(item.icon, {
                    className: `
                      text-xl transition-colors duration-200
                      ${isActive ? "text-black" : "text-white"}
                      group-hover:text-black
                    `,
                  })}
              </div>

              {/* TITLE */}
              <h4
                className={`
                  text-sm font-bold transition-all duration-200
                  ${isActive ? "text-black" : "text-white"}
                  group-hover:text-black
                `}
              >
                {item.title}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBarBottomMenu;
