import React from "react";
import { useSelector } from "react-redux";

function Elements() {
  const Elements = useSelector((state) => state.Elements.Elements);

  return (
    <>
      {Elements && (
        <div className="h-[90%] w-full overflow-scroll p-4 flex flex-col gap-4" id="scrollNone">
          {Elements.map((element, index) => (
            <div key={index} className="relative min-h-44 rounded-lg overflow-hidden hover:scale-105 transform transition-all ease-in-out duration-75">
              <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]">
                <div className="h-full w-full bg-gray-900 rounded-lg flex items-center justify-center">
                  <img
                    src={element.preview}
                    alt={element.type}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain pb-4"
                  />
                </div>
              </div>

              {/* Label at Bottom */}
              <span className="absolute bottom-0 w-full h-8 flex justify-center items-center bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white font-bold tracking-widest capitalize">
                {element.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Elements;  