import React, { useState } from 'react';
import { arrowIcon } from '../constants/icons';

const Dropdown = ({ data = [], value = "", onChange, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isLight = theme === 'light';

  const handleSelect = (item) => {
    onChange(item.id);
    setIsOpen(false);
  };

  const selectedLabel = data.find(d => d.id === value)?.label || "Select a Primary Physician";

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center rounded-md py-3 px-4 text-sm tracking-wide transition ${
          isLight
            ? "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            : "bg-neutral-800 text-stone-400 border-t border-neutral-600"
        }`}
      >
        {selectedLabel}
        <span className="pl-2">
          <img
            src={arrowIcon}
            alt=""
            className={`size-4 ${isLight ? "" : "brightness-0 invert"} transition-transform ${isOpen ? "-rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          className={`absolute z-10 mt-1 w-full rounded-md shadow-lg overflow-hidden border ${
            isLight
              ? "bg-white border-gray-300"
              : "bg-neutral-900 border-neutral-600"
          }`}
        >
          {data.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 text-sm cursor-pointer transition ${
                isLight
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-stone-300 hover:bg-neutral-700"
              }`}
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
