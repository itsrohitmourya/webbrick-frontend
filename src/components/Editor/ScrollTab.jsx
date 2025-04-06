import React, { useState } from "react";

const tabs = ["Style", "Animation & Effects", "Interactivity", "Dynamic Content"];

function TabNavigation() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div
      id="scrollNone"
      className="flex items-start justify-around border-b-2 border-gray-600 pb-2 px-2 text-white pt-2 overflow-x-scroll gap-4 snap-x snap-mandatory"
    >
      {tabs.map((tabName, index) => (
        <button
          key={index}
          onClick={() => setCurrentTab(index)} // Change active tab on click
          className={`min-h-full min-w-full border border-blue-300 rounded-full snap-center py-2 px-4 transition-all  ease-in-out duration-50
            ${currentTab === index ? "bg-gray-900 text-white" : "bg-gray-700 text-gray-300"}
          `}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;
