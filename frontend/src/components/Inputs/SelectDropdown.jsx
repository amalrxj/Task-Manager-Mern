import React from "react";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        className="flex justify-between items-center w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
        <span className=" ml-2">
          {isOpen ? (
            <LuChevronDown className="rotate-180" />
          ) : (
            <LuChevronDown />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-slate-100 rounded-md mt-1 shadow-lg">
          {options.map((option) => (
            <div
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
