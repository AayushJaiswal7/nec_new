import React from "react";

const DatePickerField = ({
  label,
  value,
  onChange,
  isRequired = false,
  className = "",
  width = "w-full",
  hideLabel = false,
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${className} ${width}`}>
      {/* Label */}
      {!hideLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Date Input */}
      <input
        type="date"
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none hover:border-primaryColor focus:border-primaryColor cursor-pointer ${width}`}
      />
    </div>
  );
};

export default DatePickerField;
