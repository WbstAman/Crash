import React from "react";

export function Tabs({ tabs = [], setTabs }) {
  const handleTabClick = (index) => {
    if (!setTabs) return;
    setTabs((prev) =>
      prev.map((t, i) => ({
        ...t,
        isActive: i === index,
      }))
    );
  };

  return (
    <div className="flex justify-between items-center w-full max-w-full sm:max-w-[276px] bg-[#091B26] rounded-[48px] p-1.5">
      {tabs?.map((item, index) => { 
        const active =item?.isActive
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleTabClick(index)}
            aria-pressed={active}
            className={`p-2 rounded-3xl w-full text-sm font-semibold transition cursor-pointer  ${
              active ? "bg-[#223845] text-white" : "text-gray-300"
            }`}
          >
            <span>{item.title}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
