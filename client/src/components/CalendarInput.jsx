import React, { useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

export default function CalendarInput({
  label,
  placeholder,
  name = "date",
  value,
  onChange,
  required = false,
}) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <div className="flex flex-col space-y-1 w-full max-w-xs sm:max-w-sm">
      {/* Label */}
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {/* Input */}
      <div className="relative">
        <input
          type="date"
          ref={inputRef}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-2.5 pr-10 text-sm sm:text-base text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          style={{
            colorScheme: 'light',
            opacity: isFocused || value ? 1 : 0
          }}
        />

        {!isFocused && !value && (
          <div
            onClick={handleClick}
            className="absolute inset-0 flex items-center px-3 cursor-pointer rounded-md border border-gray-300 bg-white"
          >
            <span className="text-gray-400 text-sm sm:text-base truncate">
              {placeholder}
            </span>
          </div>
        )}

        <div 
          className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400"
        >
          <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
}