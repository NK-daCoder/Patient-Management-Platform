import React, { useState } from 'react'
import { arrowIcon } from '../constants/icons';


const Dropdown = ({data ,children}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <button type="button" onClick={() => { setIsOpen(!isOpen) }} className='relative w-full flex justify-between items-center rounded-md bg-neutral-800 border-t border-neutral-600 py-3 px-2 text-stone-400 text-sm tracking-wide'>
        { data === "" ? "Select a Primary Physician" : data }
        <span className="border-l pl-2">
          <img src={arrowIcon} alt="" className={`size-5 brightness-0 invert filter transform transition-transform ${isOpen ? "-rotate-180" : ""}`}/>
        </span>
      </button>
      <div aria-hidden={isOpen ? true : false} className={`border-t border-neutral-500 h-0 transition-all bg-neutral-800 rounded-md overflow-y-auto ${isOpen ? "px-2 py-5 w-full h-auto" : "w-0 px-0 py-0"}`}>
        {children}
      </div>
    </div>
  )
}

export default Dropdown