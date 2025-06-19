import React from 'react'
import { arrowIcon, placeholderImage } from '../constants/icons'

const PatientProfile = ({theme, setTheme}) => {
  return (
    <button className='flex gap-2 items-center border-l pl-3 border-stone-700'>
        <img src={placeholderImage} alt="" className='bg-stone-400 size-7 rounded-full'/>
        <span className='flex flex-col '>
            <span className={`text-xs ${theme !== "light" ? "text-white" : "font-medium"} text-left tracking-wide`}>NK Mothiedie</span>
            <span className="text-xs text-stone-400 text-left tracking-wide">Patient</span>
        </span>
        
    </button>
  )
}

export { PatientProfile }