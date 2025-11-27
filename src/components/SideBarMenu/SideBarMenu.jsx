import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import SideBarTopMenu from "./components/SideBarTopMenu";

const SideBarMenu = ({ pageSize, setPageSize, isMobile }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsOpen(false);
      }
    };
    setPageSize(window.innerWidth)
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>

      <>
        {/* MOBILE TOGGLE BUTTON (only below 640px) */}
        {isMobile && (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`
                          fixed  z-30  transition-all duration-300
            flex h-8 w-8 items-center justify-center
            rounded-full bg-gray-900 border border-gray-700 shadow-lg

            ${isOpen ? "left-58 top-4" : "left-2 top-4"}

              `}
          >
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft className="text-white text-lg" />
            ) : (
              <MdKeyboardDoubleArrowRight className="text-white text-lg" />
            )}
          </button>
        )}

        {/* SIDEBAR WRAPPER */}
        <div
          className={`
          bg-[#00151F] h-full border-r border-[#1A2C35]
          transition-all duration-300

          ${isMobile
              ? // MOBILE: off-canvas drawer
              `fixed inset-y-0 left-0 w-[250px] transform z-20
                 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
              : // DESKTOP: collapsible width
              `relative z-10 w-full
                 ${isOpen ? "max-w-[250px]" : "max-w-13"}`
            }
        `}
        >
          {/* DESKTOP TOGGLE BUTTON (hidden on mobile) */}
          {!isMobile && (
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="
              cursor-pointer
              absolute -right-4 top-8 z-20
              flex h-8 w-8 items-center justify-center
              rounded-full bg-gray-900 border border-gray-700 shadow-lg
            "
            >
              {isOpen ? (
                <MdKeyboardDoubleArrowLeft className="text-white text-lg" />
              ) : (
                <MdKeyboardDoubleArrowRight className="text-white text-lg" />
              )}
            </button>
          )}

          {/* Sidebar content */}
          <div
            className={`
            w-full h-full overflow-y-auto hideScrollBar
            ${!isMobile && !isOpen ? "pr-3" : ""}
          `}
          >
            <SideBarTopMenu isOpen={isOpen} />
          </div>
        </div>
      </>
    </>
  );
};

export default SideBarMenu; 