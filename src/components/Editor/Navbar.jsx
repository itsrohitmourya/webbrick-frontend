import React from 'react'
import { Logo, Toolbar, ResponsiveView } from "../../index"

function Navbar() {
    return (
        <div className='h-18 w-[100%]  bg-slate-900 flex justify-between items-center pl-4 pr-4 border-b-1 '>
            <div className='flex gap-8 h-full w-auto justify-center items-center'>
                <Logo />
            </div>
            <div className=' absolute left-1/2 transform -translate-x-1/2'>
                <ResponsiveView />
            </div>
            <Toolbar />
        </div>
    )
}

export default Navbar