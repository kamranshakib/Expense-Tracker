import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20"
      onClick={handleBackdropClick}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-200 dark:hover:text-gray-800 cursor-pointer transition-colors duration-200"
              type="button"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
