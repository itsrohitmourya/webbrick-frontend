import React, { useEffect, useState } from 'react';
import { LucideMonitor, LucideSmartphone, LucideTablet } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { laptopScreenSize, tabletScreenSize, phoneScreenSize } from '../../app/slices/screenSizeSlice';

function ResponsiveView() {
    const [canvasSize, setCanvasSize] = useState("375px");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(canvasSize === "1024px" ? laptopScreenSize() : canvasSize === "768px" ? tabletScreenSize() : phoneScreenSize()
        );
    }, [canvasSize, dispatch]);

    const views = [
        { title: "Desktop View 1024px", size: "1024px", icon: LucideMonitor },
        { title: "Mobile View 375px", size: "375px", icon: LucideSmartphone },
        { title: "Tablet View 768px", size: "768px", icon: LucideTablet },
    ];

    const iconSize = 24;

    return (
        <div className='h-full cursor-pointer w-auto flex justify-center items-center gap-3'>
            {views.map(({ title, size, icon: Icon }) => (
                <abbr key={size} title={title}>
                    <button
                        className={`p-2 rounded-md active:scale-75 transform transition-transform ease-in-out duration-75
                            ${canvasSize === size ? "bg-gray-600 text-white" : " text-gray-300"}`}
                        onClick={() => setCanvasSize(size)}
                    >
                        <Icon size={iconSize} className='h-6 w-6' />
                    </button>
                </abbr>
            ))}
        </div>
    );
}

export default ResponsiveView;
