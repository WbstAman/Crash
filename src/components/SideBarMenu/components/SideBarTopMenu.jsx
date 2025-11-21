import React, { useEffect, useRef, useState } from "react";
import { MdExpandLess, MdExpandMore, MdOutlineSportsRugby } from "react-icons/md";
import { useNavigate } from "react-router";
import { pathConstant } from "../../../navigation/pathConstant";
import "../sideBar.css";

import Ball from "../../../assets/images/svgImages/ball";
import { FiTarget } from "react-icons/fi";
import { FaHistory, FaTrophy } from "react-icons/fa";
import { AiFillPlaySquare } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";
import CasinoIcon from "../../../assets/images/svgImages/CasinoIcon";

/* ------------------ menus ------------------ */
const menuList = [
  {
    title: "Sports",
    value: "sports",
    icon: <Ball className="text-white text-xl" />,
    isParent: false,
    subMenu: [
      {
        title: "My Profile",
        value: "my_profile",
        icon: <FiTarget className="text-white" />,
        isParent: false,
        subMenu: [],
        isActive: true,
      },
      {
        title: "Picks Center",
        value: "picks_center",
        icon: <FiTarget className="text-white" />,
        isParent: true,
        isActive: true,
        subMenu: [],
      },
    ],
    isActive: false,
  },
  {
    title: "Sports Lobby",
    value: "sports_lobby",
    icon: <MdOutlineSportsRugby className="text-white text-xl" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "In-Play",
    value: "in_play",
    icon: <AiFillPlaySquare className="text-white text-xl" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Upcoming",
    value: "upcoming",
    icon: <LuClock4 className="text-white text-xl" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Outrights",
    value: "outrights",
    icon: <FaTrophy className="text-white text-xl" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
];

const casinoMenu = [
  {
    title: "Casino",
    value: "casino",
    icon: <CasinoIcon className="text-white text-xl" />,
    isParent: false,
    subMenu: [
      {
        title: "Blackjack",
        value: "blackjack",
        icon: <FiTarget className="text-white" />,
        isParent: false,
        subMenu: [],
        isActive: true,
      },
      {
        title: "Roulette",
        value: "roulette",
        icon: <FiTarget className="text-white" />,
        isParent: true,
        isActive: true,
        subMenu: [],
      },
    ],
    isActive: true,
  },
];

 
const RecursiveMenu = ({ menu, openItems, activePath, onLeafClick, onParentToggle, menuRoot }) => {
  // refs for measuring submenu heights
  const submenuRefs = useRef({});

  // helper to get appropriate maxHeight for a submenu container
  const getMaxHeightStyle = (value) => {
    const el = submenuRefs.current[value];
    // if open and measured, set maxHeight to scrollHeight px, else 0
    if (openItems[value] && el) {
      return { maxHeight: `${el.scrollHeight}px` };
    }
    return { maxHeight: "0px" };
  };

  const renderMenu = (items, level = 0) =>
    items.map((item) => {
      const isOpen = !!openItems[item.value];
      const hasChildren = item.subMenu && item.subMenu.length > 0;
      const isActive = activePath.includes(item.value);

      return (
        <div key={item.value}>
          <div
            onClick={() => {
              if (hasChildren) {
                onParentToggle(item.value);
              } else {
                onLeafClick(item.value, menuRoot);
              }
            }}
            className={`group flex items-center cursor-pointer py-3 px-3 transition-all rounded-md
              hover:bg-yellow-dark
              ${isActive ? "bg-yellow-dark" : ""}
              ${!item.isParent ? "glowEffect" : ""}
            `}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
          >
            {/* Icon Wrapper */}
            <div
              className={`
                w-6 h-6 flex justify-center items-center rounded-full mr-3
                ${isActive ? "bg-white/80" : "bg-primary"}
              `}
            >
              {React.cloneElement(item.icon, {
                className: `
                  text-xl transition-colors duration-200
                  ${isActive ? "text-black" : "text-white"}
                  group-hover:text-black
                `,
              })}
            </div>

            {/* Title */}
            <h4
              className={`
                text-sm font-bold transition-all duration-200
                ${isActive ? "text-black" : "text-white"}
                group-hover:text-black
              `}
            >
              {item.title}
            </h4>

            {/* Arrow (rotate when open) */}
            <div className="ml-auto">
              {hasChildren && (
                <span
                  className={`inline-block transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {isOpen ? (
                    <MdExpandLess className={`${isActive ? "text-black" : "text-white"} text-md2`} />
                  ) : (
                    <MdExpandMore className={`${isActive ? "text-black" : "text-white"} text-md2`} />
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Submenu container — always mounted, but height-animated for smooth transitions */}
          {hasChildren && (
            <div
              // outer animated container
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={getMaxHeightStyle(item.value)}
              // we store the inner content element so scrollHeight can be measured
            >
              <div
                ref={(el) => {
                  // store the inner content element to measure scrollHeight
                  submenuRefs.current[item.value] = el;
                }}
                // small left padding for nested items
                className="pl-2"
              >
                {renderMenu(item.subMenu, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });

  return <div>{renderMenu(menu)}</div>;
};

/* ------------------ SideBarTopMenu (stateful) ------------------ */
const SideBarTopMenu = ({ isOpen }) => {
  const router = useNavigate();

  // shared state so only one menu / path is open at a time
  const [openItems, setOpenItems] = useState({});
  const [activePath, setActivePath] = useState([]); // e.g. ['casino','roulette','my_picks']

  useEffect(() => {
    if (!isOpen) {
      setOpenItems({});
    }
  }, [isOpen]);

  // utility: find path from root menu array to target value
  const findPath = (items, target, path = []) => {
    for (const it of items) {
      const currentPath = [...path, it.value];
      if (it.value === target) return currentPath;
      if (it.subMenu && it.subMenu.length) {
        const found = findPath(it.subMenu, target, currentPath);
        if (found) return found;
      }
    }
    return null;
  };

  // When a leaf is clicked, open only its ancestors (close others) and set activePath
  const handleLeafClick = (value, menuRoot) => {
    const path = findPath(menuRoot, value);
    if (path) {
      const newOpen = {};
      path.forEach((v) => (newOpen[v] = true));
      setOpenItems(newOpen);
      setActivePath(path);
    } else {
      setOpenItems({ [value]: true });
      setActivePath([value]);
    }

    // navigate for leaf
    switch (value) {
      case "home":
        router(pathConstant.home);
        break;
      case "my_profile":
        router(pathConstant.userProfile);
        break;
      case "my_picks":
        router(pathConstant.myPick);
        break;
      default:
        router(pathConstant.commingsoon);
        break;
    }
  };

  // When toggling a parent: if opening, close everything else and open only this parent;
  // if closing (it was open), close all.
  const handleParentToggle = (key) => {
    const currentlyOpen = !!openItems[key];
    if (currentlyOpen) {
      setOpenItems({});
      setActivePath([]);
    } else {
      setOpenItems({ [key]: true });
      setActivePath([key]);
    }
  };

  return (
    <>
      <div className="text-white w-full overflow-y-auto h-auto">
        <div className="mb-3 bg-gray-extra-dark border border-gray-extra-light rounded-2xl">
          <RecursiveMenu
            menu={casinoMenu}
            menuRoot={casinoMenu}
            openItems={openItems}
            activePath={activePath}
            onLeafClick={handleLeafClick}
            onParentToggle={handleParentToggle}
          />
        </div>

        <div className="bg-gray-extra-dark border border-gray-extra-light rounded-2xl">
          <RecursiveMenu
            menu={menuList}
            menuRoot={menuList}
            openItems={openItems}
            activePath={activePath}
            onLeafClick={handleLeafClick}
            onParentToggle={handleParentToggle}
          />
        </div>
      </div>
    </>
  );
};

export default SideBarTopMenu;
