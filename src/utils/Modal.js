import React from 'react';

function Modal({ isOpen, toggleModal, children }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-75"
          onClick={toggleModal}
        >
          <div className="relative p-4 w-full max-w-md">
            <div
              className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
