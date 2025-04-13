import React from "react";
import { useSelector } from "react-redux";

function ElementsCards() {
  const Elements = useSelector((state) => state.Elements.Elements);

  const handleDragStart = (e) => {
    const dataKey = e.currentTarget.getAttribute("data-key");
    const dragData = JSON.stringify({ dataKey });
    e.dataTransfer.setData("text/plain", dragData);
    e.currentTarget.classList.add("opacity-50");
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  return (
    <>
      {Elements && (
        <div className="h-[90%] w-full overflow-scroll p-4 flex flex-col gap-4" id="scrollNone">
          {Elements.map((element, index) => (
            <div className="relative min-h-max max-h-44  overflow-hidden hover:scale-105 transform transition-all ease-in-out duration-300 cursor-grab"
              key={index}
              data-key={index}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              draggable
            >
              <div
                className="p-[4px] rounded-2xl rounded-t-[0px] bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]"
              >
                <div className="h-max bg-gray-900 flex items-center justify-center">
                  <img
                    src={element.preview}
                    alt={element.type}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Label at Bottom */}
                <span className="w-full h-8 flex justify-center items-center bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white font-bold tracking-widest capitalize">
                  {element.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ElementsCards;  