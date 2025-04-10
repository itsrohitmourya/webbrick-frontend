import React from 'react'

function Loader() {
    return (
        <>
      <div className='bg-[#000000c1] backdrop-blur-[3px] fixed inset-0 z-[1000] h-[100vh] w-full flex justify-center items-center pointer-events-auto'>

        <div class="container">
            <div class="loader"></div>
            <div class="loader"></div>
            <div class="loader"></div>
        </div>
        </div>
        </>
    )
}

export default Loader