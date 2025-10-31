import React from "react";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  isRequired = false,
  className = "",
  width = "w-full",
  hideLabel = false,
  autoComplete="off",
  icon,
  name,
  error = "",
  disabled,
  readOnly
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${className} ${width}`}>
      {!hideLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          className={`w-full px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:outline-none hover:border-primaryColor focus:border-primaryColor ${error ? "border-red-500" : "border-gray-300"
            } ${icon ? "pl-10" : ""} ${width}`}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>

      {/* show error if exists */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
