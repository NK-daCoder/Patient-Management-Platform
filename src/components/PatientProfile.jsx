import React from 'react'

const PatientProfile = () => {
  return (
    <button className='flex gap-2 items-center px-3 py-2 bg-stone-900 rounded-2xl border-t border-stone-700 shadow-md'>
        <img src="#" alt="" className='bg-stone-400 size-7 rounded-full'/>
        <span className='flex flex-col '>
            <span className="text-sm text-white text-left tracking-wide">Full Name</span>
            <span className="text-xs text-stone-400 text-left tracking-wide">Patient</span>
        </span>
    </button>
  )
}

export { PatientProfile }