import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const PasswordField = ({
  label,
  placeholder = "Enter password",
  value,
  onChange,
  isRequired = false,
  className = "",
  width = "w-full",
  hideLabel = false,
  name,
  error = "",
  autoComplete = "new-password"
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${className} ${width}`}>
      {!hideLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`w-full px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none hover:border-primaryColor focus:border-primaryColor ${error ? "border-red-500" : "border-gray-300"} ${width}`}
        autoComplete={autoComplete}
      />

      {/* Show error if exists */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default PasswordField;
