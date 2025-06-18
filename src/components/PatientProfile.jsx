import React from 'react'
import { arrowIcon } from '../constants/icons'

const PatientProfile = () => {
  return (
    <button className='flex gap-2 items-center border-l pl-3 border-stone-700'>
        <img src="#" alt="" className='bg-stone-400 size-6 rounded-full'/>
        <span className='flex flex-col '>
            <span className="text-xs text-white text-left tracking-wide">NK Mothiedie</span>
            <span className="text-xs text-stone-400 text-left tracking-wide">Patient</span>
        </span>
        
    </button>
  )
}

export { PatientProfile }