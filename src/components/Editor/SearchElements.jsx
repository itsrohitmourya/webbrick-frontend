import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ElementsCards } from "../../index";

function SearchElements() {
    const Elements = useSelector((state) => state.Elements.Elements);
    const [searchTerm, setSearchTerm] = useState("");

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

    // Filtered elements based on name/type match
    const filteredElements = Elements.filter((el) =>
        el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        el.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="w-full h-max p-4 pb-0 flex flex-col">
                {/* 🔍 Search Box */}
                <input
                    type="text"
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 outline-none rounded-lg border-2 text-white border-violet-500"
                />

                {/* 🔽 Search Results */}
                {searchTerm && (
                    <div
                        className=" w-full pt-4 overflow-scroll flex flex-col gap-4"
                        id="scrollNone"
                    >
                        {filteredElements.length > 0 ? (
                            filteredElements.map((element, index) => (
                                <div
                                    className="relative min-h-max max-h-44 overflow-hidden hover:scale-105 transform transition-all ease-in-out duration-300 cursor-grab"
                                    key={index}
                                    data-key={index}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    draggable
                                >
                                    <div className="p-[4px] rounded-lg rounded-t-[0px] bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]">
                                        <div className="h-max py-2 bg-gray-900 flex items-center justify-center">
                                            <img
                                                src={element.preview}
                                                alt={element.type}
                                                loading="lazy"
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                        <span className="w-full h-8 flex justify-center items-center bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white font-bold tracking-widest capitalize">
                                            {element.name}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 font-medium">No results found</p>
                        )}
                    </div>
                )}
            </div>
            {
                searchTerm === '' && <ElementsCards/>
            }
        </>
    );
}

export default SearchElements;
