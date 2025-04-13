import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CreatePage,  SearchElements } from '../../index'
import { useSelector } from 'react-redux'

function CompPanel() {
  const IconSize = 30
  const [activeSection, setactiveSection] = useState(null)
  const curWorkProject = useSelector((state)=> state.projectMan.curWorkProject)
  const pages = useSelector((state) => state.projectMan.projects[curWorkProject].pages)

  const handleCompSection = (crrSec) => {
    setactiveSection(activeSection === crrSec ? null : crrSec)
  }


  return (
    <div className='h-[100%]  w-2xs bg-zinc-800 flex flex-col justify-baseline items-center'>
      <button
        className='flex justify-between items-center px-4 min-h-12 w-full bg-sky-700 text-white capitalize text-lg border border-black'
        onClick={() => handleCompSection("addPages")}
      >
        Add Pages
        <div className='h-full flex w-max justify-center items-center'>
          {
            activeSection === "addPages" ? <ChevronDown size={IconSize} color='white' /> : <ChevronUp size={IconSize} color='white' />
          }
        </div>
      </button>
      {
        activeSection === "addPages" &&
        <CreatePage />
      }
      {pages.length > 0 && (
        <>
          <button
            className='flex justify-between items-center px-4 min-h-12 w-full bg-sky-700 text-white capitalize text-lg border border-black'
            onClick={() => handleCompSection("addElements")}
          >
            Add Elements
            <div className='h-full flex w-max justify-center items-center'>
              {
                activeSection === "addElements" ?
                  <ChevronDown size={IconSize} color='white' /> :
                  <ChevronUp size={IconSize} color='white' />
              }
            </div>
          </button>
        </>
      )
      }
      <div id='scrollNone' className='w-full h-full overflow-y-scroll flex flex-col justify-start items-center'>
      {
        activeSection === "addElements" &&
        <>
        <SearchElements/>
        </>
      }
      </div>
    </div>
  )
}

export default CompPanel