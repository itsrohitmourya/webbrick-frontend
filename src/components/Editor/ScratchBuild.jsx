import React from "react";
import { useSelector } from "react-redux";

function ScratchBuild() {
    const categories = useSelector((state) => state.scratchBuild.scratchBuild);
    
    const handleDragStart = (e) => {
        const dataKey = e.currentTarget.getAttribute("data-key");
        const category = e.currentTarget.getAttribute("data-category");

        const dragData = JSON.stringify({ dataKey, category });

        e.dataTransfer.setData("text/plain", dragData);
        e.currentTarget.setAttribute("data-info", dragData); // Store in attribute for mobile

        e.currentTarget.classList.add("opacity-50");
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove("opacity-50");
    };

    // Mobile Drag Handlers
    
  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default scrolling

    const touch = e.touches[0];
    const target = e.target.closest("[draggable]");
    if (!target) return;

    target.style.position = "absolute";
    target.style.left = `${touch.clientX}px`;
    target.style.top = `${touch.clientY}px`;
  };

  const handleTouchEnd = (e) => {
    const target = e.target.closest("[draggable]");
    if (!target) return;

    target.classList.remove("opacity-50");
    target.style.position = "static";

    const info = target.getAttribute("data-info");
    if (info) {
      const droppedData = JSON.parse(info);
      console.log("Dropped Element Data (Mobile):", droppedData);
    }
  };
    return (
        <>
            {Object.entries(categories).map(([categoryName, items]) => (
                items && (
                    <div key={categoryName} className="w-full">
                        <span className="h-12 w-[90%] m-auto bg-zinc-700 flex justify-center items-center capitalize rounded-lg text-white mt-4">
                            {categoryName.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                        <div className="text-white grid grid-cols-2 place-items-center w-full p-4 gap-4 divide-x-2 divide-y-2 divide-amber-300">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    draggable
                                    data-key={index}
                                    data-category={categoryName}
                                    onDragStart={(e) => handleDragStart(e, item, index)}
                                    onDragEnd={handleDragEnd}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    className="h-28 w-full text-white flex justify-center items-center text-center border-amber-900 border capitalize rounded-lg"
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </>
    );
}

export default ScratchBuild;
