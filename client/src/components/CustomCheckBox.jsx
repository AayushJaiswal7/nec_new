import { FiCheck } from "react-icons/fi";

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <label className="relative w-4 h-4 cursor-pointer flex items-center justify-center">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 w-full h-full cursor-pointer"
      />
      
      {/* Custom checkbox border - always visible */}
      <div className={`w-4 h-4 border border-2  flex items-center justify-center ${
        checked ? 'border-primaryColor' : 'border-gray-300'
      }`}>
        {/* Check icon - only visible when checked */}
        {checked && (
          <FiCheck className="text-primaryColor text-[14px] pointer-events-none" />
        )}
      </div>
    </label>
  );
};

export default CustomCheckbox;