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
                  className={`inline-block transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
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


function CasinoIcon  ({ size = 30, color = "#fff" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none">
      <g clip-path="url(#clip0_304_3)">
        <path d="M137.2 163.1C137.2 172.1 132.6 177.6 124.2 179.9C106.6 184.7 88.9001 189.3 71.3001 194C65.5001 195.5 59.8002 197.2 54.0002 198.7C43.0002 201.5 35.7002 197.5 32.7002 186.6C22.1002 147.5 11.5002 108.4 1.10016 69.1999C-1.69984 58.7999 2.60015 51.4999 13.0002 48.5999C37.0002 41.9999 61.1002 35.4999 85.1002 29.1999C94.7002 26.6999 102.3 31.4999 105 41.5999C112.4 68.9999 119.7 96.4999 127.1 123.9C130.2 135.6 133.3 147.3 136.4 159.1C136.9 160.9 137.1 162.7 137.2 163.1ZM60.7002 80.7999C59.3002 82.6999 57.5001 84.1999 56.8001 85.9999C53.2001 95.9999 50.0002 106.1 46.4002 116.1C45.2002 119.4 46.1002 121.7 48.7002 123.9C56.5002 130.6 64.2002 137.5 72.0002 144.3C76.5002 148.2 79.0002 147.6 81.0002 141.8C84.4002 132.1 87.4002 122.3 91.0002 112.6C92.3002 109 91.5001 106.7 88.8001 104.3C80.7001 97.3999 72.8001 90.2999 64.8001 83.2999C63.8001 82.4999 62.6002 81.9999 60.7002 80.7999Z" fill={color} />
        <path d="M93.3003 16.8C95.2003 3.79998 101.4 -1.20001 113.7 0.899986C138 4.99999 162.2 9.3 186.3 13.7C196.1 15.5 200.9 22.4 199.3 32.1C194.2 62.1 188.9 92 183.6 122C181.8 132.3 179.9 142.6 178.1 152.9C176.3 163 168.8 168.5 158.7 166.8C155.6 166.3 152.5 165.6 150.1 165.1C145.5 147.8 141.2 131 136.6 114.2C135.6 110.6 136.1 108.7 139.3 106.5C149.2 99.6 157.9 91.4 162.8 79.9C167.3 69.2 163.1 59 153 57.8C148.7 57.3 144 59.5 138.8 60.7C135.5 54.7 129.5 51.4 120.6 54C119.5 50.1 118.3 46.4 117.5 42.6C114.8 28.8 107.5 19.5 93.3003 16.8Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_304_3">
          <rect width="200" height="200" fill={color} />
        </clipPath>
      </defs>
    </svg>)
}
