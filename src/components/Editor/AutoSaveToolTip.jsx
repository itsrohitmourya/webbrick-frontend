import React, { useState, useEffect } from "react";

function AutoSaveToolTip() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start progress bar animation
    const progressTimer = setTimeout(() => setProgress(100), 100);

    // Hide tooltip after 3.2 seconds (animation duration + slight delay)
    const hideTimer = setTimeout(() => setVisible(false), 3200);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`fixed left-1/2 bottom-4 transform -translate-x-1/2 p-4 w-44 bg-zinc-800 text-white text-lg font-bold text-center rounded-lg overflow-hidden transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      Project Saved!
      <div
        className="absolute bottom-0 left-0 h-2 bg-green-400 transition-all duration-[3000ms]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default AutoSaveToolTip;
