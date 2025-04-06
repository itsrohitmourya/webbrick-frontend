import React, { useEffect, useState } from 'react'
import { Canvas, Navbar, SideBar, AutoSaveHandler } from '../../index'
import { useSelector } from 'react-redux'

function Editor() {
  const pro = useSelector((state) => state.projectMan.projects)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [pro])

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <Navbar />
      <div className="h-[calc(100vh-4.6rem)] w-[100vw] overflow-x-hidden flex box-border">
        <SideBar />
        <Canvas />
        <AutoSaveHandler />

        {/* ✅ Small Screen Error Popup */}
        {isSmallScreen && (
          <div className="fixed top-0 left-0 w-full border-2 border-amber-300 h-full bg-black bg-opacity-70 z-50 flex justify-center items-center">
            <div className="bg-red-600 text-white w-[90%] p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold">Screen Too Small</h2>
              <p className="mt-2">Please use a larger screen (min width: 800px) for the best experience.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Editor
