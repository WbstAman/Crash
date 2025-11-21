import { BiSolidOffer } from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa";
import { TbCircleDotted } from "react-icons/tb";

export const otherMenu = [
  {
    title: "Giveaway",
    value: "giveaway",
    icon: <FaGift  className="text-gray-dark text-xl" />,
    isParent: false,
    isActive: true,
  },
    {
    title: "Promotions",
    value: "promotions",
    icon: <BiSolidOffer  className="text-gray-dark text-xl" />,
    isParent: false,
    isActive: true,
  },
    {
    title: "Affilate",
    value: "affilate",
    icon: <TbCircleDotted  className="text-gray-dark text-xl" />,
    isParent: false,
    isActive: true,
  },
      {
    title: "FAQ",
    value: "faq",
    icon: <BsFillQuestionCircleFill  className="text-gray-dark text-xl" />,
    isParent: false,
    isActive: true,
  },

]