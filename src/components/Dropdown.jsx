import React, { useState } from 'react';
import { arrowIcon } from '../constants/icons';

const Dropdown = ({ data = [], value = "", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    onChange(item.id); // Return only the ID for consistency
    setIsOpen(false);
  };

  const selectedLabel = data.find(d => d.id === value)?.label || "Select a Primary Physician";

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex justify-between items-center rounded-md bg-neutral-800 border-t border-neutral-600 py-3 px-4 text-stone-400 text-sm tracking-wide'
      >
        {selectedLabel}
        <span className="pl-2">
          <img
            src={arrowIcon}
            alt=""
            className={`size-4 brightness-0 invert transition-transform ${isOpen ? "-rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-neutral-900 rounded-md shadow-lg border border-neutral-600">
          {data.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 text-sm text-stone-300 hover:bg-neutral-700 cursor-pointer transition"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
