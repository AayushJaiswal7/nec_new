import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

export default function FileUploadInput({
  name = "document",
  placeholder,
  onChange,
  accept = "*",
}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) {
        onChange(file);
      }
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm">
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        onClick={() => fileInputRef.current.click()}
        className="relative cursor-pointer rounded-full border border-gray-300 bg-[#ffefe7] px-3 py-2 sm:px-4 sm:py-2.5 pl-10 sm:pl-12 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 hover:border-gray-400 transition-colors"
      >
        <div className='absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-gray-400'>
          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {fileName ? (
          <span className="truncate block">{fileName}</span>
        ) : (
          <span className="text-gray-400 truncate block">{placeholder || "Upload File"}</span>
        )}
      </div>
    </div>
  );
}