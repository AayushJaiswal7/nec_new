import React from "react";

const DropDown = ({
  label,
  options = [],
  value = "",
  onChange,
  placeholder,
  isRequired = false,
  className = "",
  width = "w-full",
  hideLabel = false,
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${width} ${className}`}>
      {/* Label */}
      {!hideLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Field */}
      <select
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none hover:border-primaryColor focus:border-primaryColor cursor-pointer ${width}`}
      >
        <option value="">
          {placeholder || `Select ${label}`}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
