import React from "react";

const textareaField = ({
  label,
  placeholder,
  value,
  onChange,
  isRequired = false,
  className = "",
  width = "w-full",
  hideLabel = false,
  rows = 4,
  name,
  error = ""
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${className} ${width}`}>
      {!hideLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none hover:border-primaryColor focus:border-primaryColor resize-none ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default textareaField;
