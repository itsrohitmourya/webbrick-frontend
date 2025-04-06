import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className='h-full cursor-pointer w-auto  flex justify-center gap-2 items-center'>
      <Link to={'/'} className='h-full cursor-pointer w-auto  flex justify-center gap-2 items-center'>
      <img src="/icon2.png" alt="logo" className='h-[55%] w-auto' />
      <span className='text-4xl bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent font-extrabold font-[Poppins] mt-[4px]'>
        WebBrick
      </span>
    </Link>
    </div>
  )
}

export default Logo
