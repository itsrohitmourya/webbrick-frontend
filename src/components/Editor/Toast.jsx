import React from 'react';
import { BanIcon, CircleCheckIcon } from 'lucide-react';

function Toast({ msg, icon }) {
  return (
    <div
      className="fixed bottom-10 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-lg
      border-[2px] border-violet-600 bg-gray-800 text-white backdrop-blur-md
      shadow-[0_4px_30px_rgba(0,0,0,0.85)] animate-toast transition-all duration-300 ease-in-out"
    >
      {
        icon === 'error' ? (
          <BanIcon size={20} className="text-red-500" />
        ) : (
          <CircleCheckIcon size={20} className="text-green-500" />
        )
      }
      <span className="capitalize text-lg font-medium tracking-wide">{msg}</span>
    </div>
  );
}

export default Toast;
