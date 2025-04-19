import React from 'react'
import { LogOutIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {  resume } from '../../app/slices/EditorLogoutSlice'
import { Link, Navigate } from 'react-router-dom'

function Exit() {
    const dispatch = useDispatch()
    const handleResume = () => {
        dispatch(resume())
    }
    const handleExit = () =>{
        dispatch(resume())
    }
 return (
    <div className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.48)]  backdrop-filter backdrop-blur-[2px] z-1000'>
        <div className='h-[250px] w-94 rounded-lg shadow-lg flex flex-col items-center justify-center bg-zinc-950 px-4 py-4'>
            <span className='flex-1 w-full flex justify-center items-center tracking-wide leading-10 text-center text-white text-3xl'>
                Are you sure you want to Exit?
            </span>
            <div className='h-20 w-full flex justify-center items-center gap-2'>
                <button 
                className='flex-1 flex justify-center items-center gap-4 capitalize bg-green-600 active:bg-green-700 p-2 rounded-md text-white text-lg'
                onClick={()=> handleResume()}
                >
                    Resume
                </button>
                <button 
                className='flex-1 flex justify-center items-center gap-4 capitalize bg-red-600 active:bg-red-700 p-2 rounded-md text-white text-lg'
                onClick={()=> handleExit()}
                >
                    <Link to="/dashboard">
                        Exit   
                    </Link>
                    <LogOutIcon size={24} color='white' />
                </button>
            </div>
        </div>
    </div>
)
}

export default Exit