const CardComponent = ({
  title,
  icon: Icon,
  onClick,
  className = "",
  children,
  iconProps = {},
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
   const formattedTitle = title.includes("(")
    ? {
        main: title.substring(0, title.indexOf("(")).trim(),
        extra: title.substring(title.indexOf("(")).trim(),
      }
    : { main: title, extra: "" };

  return (
    <div
      className={`
      w-28 h-28 
      bg-white rounded-lg 
      flex flex-col justify-between m-2 p-2 
      border border-gray-200 
      hover:border-primaryColor 
      hover:scale-[0.975]
      transition-all duration-200
      cursor-pointer
      ${className}
    `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e);
        }
      }}
    >
      {/* Icon at the top */}
      {Icon && (
        <div className="flex justify-start pt-2 pl-2">
          {typeof Icon === "string" ? (
            <img src={Icon} alt="icon" className="w-5 h-5 text-primaryColor" />
          ) : (
            <Icon size={20} className="text-primaryColor" {...iconProps} />
          )}
        </div>
      )}


      {/* Title at the bottom */}
      <div className="flex justify-center text-left flex-col pl-2">
        <h6 className="text-sm text-gray-800 leading-tight">
          {formattedTitle.main}
          {formattedTitle.extra && (
            <>
              <br />
              <span className="text-xs text-gray-600">
                {formattedTitle.extra}
              </span>
            </>
          )}
        </h6>
      </div>

      {/* Additional content */}
      {children}
    </div>
  );
};

export default CardComponent;
