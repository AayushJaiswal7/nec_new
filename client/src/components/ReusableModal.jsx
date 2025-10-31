// Modal.js
import React from 'react';

const ReusableModal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose} // close when clicking outside
      ></div>

      {/* Modal content */}
      <div className="bg-white justify-center rounded-xl shadow-lg z-50 w-96 p-14 ">
        {/* Header */}
        {title && <h2 className="text-lg text-center  mb-8">{title}</h2>}

        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Actions */}
        {actions && <div className="flex justify-end space-x-2">{actions}</div>}
      </div>
    </div>
  );
};

export default ReusableModal;
