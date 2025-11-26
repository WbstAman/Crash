import React, { useEffect, useRef, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router";
import { pathConstant } from "../../../navigation/pathConstant";
import logo from "../../../assets/images/logo.png";
import CashrakeGamesIcon from "../../../assets/images/svgImages/CashrakeGamesIcon";
import GameShowsIcon from "../../../assets/images/svgImages/GameShowsIcon";
import { HighRTPIcon } from "../../../assets/images/svgImages/HighRTPIcon";
import LiveCasinoIcon from "../../../assets/images/svgImages/LiveCasinoIcon";
import LobbyIcon from "../../../assets/images/svgImages/LobbyIcon";
import NewSlotIcon from "../../../assets/images/svgImages/NewSlotIcon";
import PopularSlots from "../../../assets/images/svgImages/PopularSlots";
import ProvidersIcon from "../../../assets/images/svgImages/ProvidersIcon";
import TableGamesIcon from "../../../assets/images/svgImages/TableGamesIcon";
import ThunderIcon from "../../../assets/images/svgImages/ThunderIcon";
import VideoPokerIcon from "../../../assets/images/svgImages/VideoPokerIcon";
import SportsIcon from "../../../assets/images/svgImages/sportsIcon";
import GiveawaysIcon from "../../../assets/images/svgImages/GiveawaysIcon";
import PromotionsIcon from "../../../assets/images/svgImages/PromotionsIcon";
import SponsorshipsIcon from "../../../assets/images/svgImages/SponsorshipsIcon";
import StreamsIcons from "../../../assets/images/svgImages/StreamsIcons";
import SupportIcon from "../../../assets/images/svgImages/SupportIcon";
import AffiliateIcon from "../../../assets/images/svgImages/AffiliateIcon";
import shortLogo from "../../../assets/images/shortLogo.png"
import "../sideBar.css";

/* ------------------ menus ------------------ */
const menuList = [
  {
    title: "Casino",
    value: "casino",
    icon: <CasinoIcon className="text-white text-md2" />,
    isParent: false,
    subMenu: [
      {
        title: "Bonus Buy Hub",
        value: "bonus-buy-hub",
        icon: "",
        isParent: false,
        subMenu: [],
        isActive: true,
      },
      {
        title: "Spin Your Balance",
        value: "spin-your-balance",
        icon: "",
        isParent: true,
        isActive: true,
        subMenu: [],
      },
    ],
    isActive: true,
  },
  {
    title: "Lobby",
    value: "lobby",
    icon: <LobbyIcon className="text-white text-md2" />,
    isParent: false,
    subMenu: [],
    isActive: false,
  },
  {
    title: "Crash Games",
    value: "crash-games",
    icon: <ThunderIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "New Slots",
    value: "new_slots",
    icon: <NewSlotIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Popular Slots",
    value: "popular_slots",
    icon: <PopularSlots className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "High RTP",
    value: "high_rtp",
    icon: <HighRTPIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Table Games",
    value: "tableGames",
    icon: <TableGamesIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Video Poker",
    value: "video_poker",
    icon: <VideoPokerIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Live Casino",
    value: "live_casino",
    icon: <LiveCasinoIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Game Shows",
    value: "game_shows",
    icon: <GameShowsIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Cashrake Games",
    value: "cashrake_games",
    icon: <CashrakeGamesIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Providers",
    value: "providers",
    icon: <ProvidersIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },


  {
    title: "Sports",
    value: "sports",
    icon: <SportsIcon className="text-white text-md2" />,
    isParent: false,
    subMenu: [
      {
        title: "Bonus Buy Hub",
        value: "bonus-buy-hub",
        icon: "",
        isParent: false,
        subMenu: [],
        isActive: true,
      },
      {
        title: "Spin Your Balance",
        value: "spin-your-balance",
        icon: "",
        isParent: true,
        isActive: true,
        subMenu: [],
      },
    ],
    isActive: true,
  },

  {
    title: "Giveaways",
    value: "giveaways",
    icon: <GiveawaysIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Promotions",
    value: "promotions",
    icon: <PromotionsIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },
  {
    title: "Sponsorships",
    value: "sponsorships",
    icon: <SponsorshipsIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [
      {
        title: "Bonus Buy Hub",
        value: "bonus-buy-hub",
        icon: "",
        isParent: false,
        subMenu: [],
        isActive: true,
      },
      {
        title: "Spin Your Balance",
        value: "spin-your-balance",
        icon: "",
        isParent: true,
        isActive: true,
        subMenu: [],
      },
    ],
  },
  {
    title: "Watch Streams",
    value: "watch_streams",
    icon: <StreamsIcons className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  },

  {
    title: "Support",
    value: "support",
    icon: <SupportIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [
      {
        title: "Bonus Buy Hub",
        value: "bonus-buy-hub",
        icon: "",
        isParent: false,
        subMenu: [],
        isActive: true,
      },
      {
        title: "Spin Your Balance",
        value: "spin-your-balance",
        icon: "",
        isParent: true,
        isActive: true,
        subMenu: [],
      },
    ],
  },
  {
    title: "Affiliate",
    value: "affiliate",
    icon: <AffiliateIcon className="text-white text-md2" />,
    isParent: true,
    isActive: true,
    subMenu: [],
  }
];



const RecursiveMenu = ({ menu, openItems, activePath, onLeafClick, onParentToggle, menuRoot }) => {
  const submenuRefs = useRef({});

  const getMaxHeightStyle = (value) => {
    const el = submenuRefs.current[value];
    if (openItems[value] && el) {
      return { maxHeight: `${el.scrollHeight}px` };
    }
    return { maxHeight: "0px" };
  };

const renderMenu = (items, level = 0) =>
  items.map((item) => {
    const isOpen = !!openItems[item.value];
    const hasChildren = item.subMenu && item.subMenu.length > 0;

    const lastIndex = activePath.length - 1;
    const isLeafActive = lastIndex >= 0 && activePath[lastIndex] === item.value;
    const isParentActive =
      activePath.length > 1 && activePath[lastIndex - 1] === item.value;
    const isActive = isLeafActive || isParentActive;
    const isSubMenu = level > 0; // <-- this line identifies submenus

    return (
      <div key={item.value}>
        <div
          onClick={() => {
            if (hasChildren) onParentToggle(item.value);
            else onLeafClick(item.value, menuRoot);
          }}
      className={`menu-item group flex items-center cursor-pointer py-3 px-3 transition-all rounded-[4px]
  ${isActive ? "glowEffect" : ""}
  ${isSubMenu ? "submenu-item" : ""}
`}

        >
          {item?.icon && (
            <div className="w-6 h-6 flex justify-center items-center rounded-full mr-3 text-white">
              {React.cloneElement(item?.icon, {
                className: `
                  text-xl transition-colors duration-200
                  ${isActive ? "text-black" : "text-white"}
                `,
              })}
            </div>
          )}

          <h4 className="text-xs font-semibold transition-all duration-200 text-white font-instrumentSans">
            {item.title}
          </h4>

          <div className="ml-auto">
            {hasChildren && (
              <span
                className={`inline-block transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                {isOpen ? (
                  <MdExpandLess className="text-white text-md2" />
                ) : (
                  <MdExpandMore className="text-white text-md2" />
                )}
              </span>
            )}
          </div>
        </div>

        {hasChildren && (
          <div
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            style={getMaxHeightStyle(item.value)}
          >
            <div
              ref={(el) => (submenuRefs.current[item.value] = el)}
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

  const navigate = useNavigate()
  return (
    <>
      <div className="text-white w-full overflow-y-auto h-auto pt-6">

        <div className="max-w-[255px] w-full cursor-pointer mb-4" onClick={() => navigate("/")}>
          <img src={isOpen ? logo : shortLogo} alt={logo} />
        </div>

        <div className="">
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


function CasinoIcon({ size = 20, color = "#fff" }) {
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
    </svg>
  )
}
