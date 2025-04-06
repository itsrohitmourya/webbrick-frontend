import { React, useState, useEffect } from 'react'

function StyleBox() {
    const [TouchScroll, setTouchScroll] = useState(false);

    useEffect(() => {
        const handleScreen = () => {
            setTouchScroll(window.innerWidth <= 900);
        };

        handleScreen();

        window.addEventListener("resize", handleScreen);

        return () => {
            window.removeEventListener("resize", handleScreen);
        };
    }, []);
    
    return (
        <div className='min-h-full min-w-[17rem] max-w-[17rem] bg-gray-800 '>
        </div>
    )
}

export default StyleBox