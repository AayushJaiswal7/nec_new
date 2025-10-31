const SecondaryButton = ({ text, onClick, icon: Icon, disabled = false }) => {
  return (
    <>
      {/* This is a button component reusable purpose */}

      <button
        onClick={onClick}
        disabled={disabled}
        className={`text-sm px-4 py-2 rounded flex items-center m-2 border ${
          disabled 
            ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
            : 'border-black text-black cursor-pointer'
        }`}
      >
        {Icon && <Icon size={14} className="mr-2" />}
        {text}
      </button>
    </>
  );
};

export default SecondaryButton;