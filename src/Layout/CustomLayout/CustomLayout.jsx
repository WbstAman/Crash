import { useState } from "react";
import Header from "../../components/Header/Header";
import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import CommonHeading from "../../components/UI/CommonHeading/CommonHeading";
import { MdStarOutline } from "react-icons/md";
import { AiOutlineExpand } from "react-icons/ai";

const CustomLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex justify-between w-full mx-auto pt-6">
      <SideBarMenu isOpen={isOpen} />
      <div className="w-full max-w-[1136px] gap-3">
        <Header toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default CustomLayout;
