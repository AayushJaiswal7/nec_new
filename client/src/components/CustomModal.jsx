import React from "react";

const CommonModal = ({
    show,
    onHide,
    title,
    children,
    footer,
    size = "md", // sm | md | lg | xl
    centered = true,
    backdrop = true,
    keyboard = true, // (for ESC close)
    className = "",
}) => {
    if (!show) return null;

    // Close modal with ESC if keyboard = true
    React.useEffect(() => {
        if (!keyboard) return;
        const handleKey = (e) => e.key === "Escape" && onHide?.();
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [keyboard, onHide]);

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex ${centered ? "items-center" : "items-start mt-10"
                } justify-center ${className}`}
        >
            {/* Backdrop */}
            {backdrop && (
                <div
                    onClick={onHide}
                    className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
                />
            )}

            {/* Modal Container */}
            <div
                className={`relative bg-white rounded-xl shadow-lg w-full ${sizeClasses[size]} z-50`}
            >
                {/* Header */}
                {title && (
                    <div className="flex justify-between items-center border-b px-5 py-3">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <button
                            onClick={onHide}
                            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-5">{children}</div>


                {/* Footer */}
                {footer !== undefined ? (
                    <div className="border-t px-5 py-3 flex justify-center gap-2">
                        {footer}
                    </div>
                ) : (
                    <div className="border-t px-5 py-3 flex justify-center">
                        <button
                            onClick={onHide}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommonModal;
