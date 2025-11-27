import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import SideBarTopMenu from "./components/SideBarTopMenu";

const SideBarMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsOpen(false);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div
      className={`absolute bg-[#00151F] z-10 xl:relative h-full transition-all duration-300 w-full
        ${isOpen ? "max-w-[250px]" : "max-w-13"}
      `}
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className=" cursor-pointer
          absolute -right-4 top-8 z-20
          flex h-8 w-8 items-center justify-center
          rounded-full bg-gray-900 border border-gray-700 shadow-lg
        "
      >
        {isOpen ? (
          <MdKeyboardDoubleArrowLeft  className="text-white text-lg" />
        ) : (
          <MdKeyboardDoubleArrowRight  className="text-white text-lg" />
        )}
      </button>

      {/* Sidebar content */}
      <div className={`w-full h-full overflow-y-auto hideScrollBar border-r border-[#1A2C35] ${isOpen ? "": "pr-3"}`}>
        <SideBarTopMenu isOpen={isOpen} />
      </div>
    </div>
  );
};

export default SideBarMenu;
