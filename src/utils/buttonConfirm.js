// import { Button } from 'flowbite-react';
// import React, { useState } from 'react';

// function Modal({ isOpen, toggleModal, children }) {
//     return (
//       <>
//         {isOpen && (
//           <div
//             className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-75"
//             onClick={toggleModal}
//           >
//             <div className="relative p-4 w-full max-w-md">
//               <div
//                 className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {children}
//               </div>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }

// function DeleteButton({ onDelete, onUpdate ,onCancel}) {
//   const [showModal, setShowModal] = useState(false);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const handleDelete = () => {
//     onDelete();
//     toggleModal();
//   };
//   const handleCancel= ()=>{
//     onCancel()
//     toggleModal()
//   }

//   const handleUpdate = () => {
//     onUpdate();
//     toggleModal();
//   };

//   return (
//     <div className="flex justify-center m-5">
//       <Button
//         id="deleteButton"
//         // className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         type="button"
//         onClick={toggleModal}
//       >
//         Show confirmation
//       </Button>

//       <Modal isOpen={showModal} toggleModal={toggleModal}>
//         <button
//           type="button"
//           className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//           onClick={toggleModal}
//         >
//           <svg
//             aria-hidden="true"
//             className="w-5 h-5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//           <span className="sr-only">Close modal</span>
//         </button>
//         <div className="flex flex-col items-center space-y-4">
//           <svg
//             className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
//             aria-hidden="true"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//           <p className="mb-4 text-gray-500 dark:text-gray-300">
//             Are you sure you want to perform this action?
//           </p>
//           <div className="flex justify-center items-center space-x-4">
//             <button
//               type="button"
//               className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//             <button
//               type="button"
//               className="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
//               onClick={handleUpdate}
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DeleteButton;

// import React from 'react';
// import Modal from './Modal';
// import { Button } from 'flowbite-react';

// function DeleteButton({ action }) {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleAction = () => {
//     // Appeler l'action spécifiée
//     if (action === 'delete') {
//       console.log('Supprimer');
//       // Logique de suppression à implémenter ici
//     } else if (action === 'update') {
//       console.log('Mettre à jour');
//       // Logique de mise à jour à implémenter ici
//     }
//   };

//   return (
//     <div className="flex justify-center m-5">
//       <Button
//         // className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         onClick={toggleModal}
//       >
//         Show {action === 'delete' ? 'delete' : 'update'} confirmation
//       </Button>
//       <Modal isOpen={isOpen} toggleModal={toggleModal}>
//         <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
//           {/* Contenu du modal */}
//           <button
//             type="button"
//             className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//             onClick={toggleModal}
//           >
//             <svg
//               aria-hidden="true"
//               className="w-5 h-5"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//             <span className="sr-only">Close modal</span>
//           </button>
//           <svg
//             className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
//             aria-hidden="true"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//           <p className="mb-4 text-gray-500 dark:text-gray-300">
//             Are you sure you want to {action === 'delete' ? 'delete' : 'update'} this item?
//           </p>
//           <div className="flex justify-center items-center space-x-4">
//             <button
//               type="button"
//               className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//               onClick={toggleModal}
//             >
//               No, cancel
//             </button>
//             <button
//               type="submit"
//               className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
//               onClick={handleAction}
//             >
//               {action === 'delete' ? 'Yes, delete' : 'Yes, update'}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DeleteButton;
import React from 'react';
import Modal from './Modal';
import { Button } from 'flowbite-react';

function DeleteButton({ action }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = () => {
    // Appeler l'action spécifiée
    if (action === 'delete') {
      console.log('Supprimer');
      // Logique de suppression à implémenter ici
    } else if (action === 'update') {
      console.log('Mettre à jour');
      // Logique de mise à jour à implémenter ici
    }
  };

  return (
    <div className="flex justify-center m-5">
      <Button
        className={`block text-white ${
          action === 'delete' ? 'bg-primary-700 hover:bg-primary-800' : 'bg-green-500 hover:bg-green-600'
        } focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
        onClick={toggleModal}
      >
        Show {action === 'delete' ? 'delete' : 'update'} confirmation
      </Button>
      
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Contenu du modal */}
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleModal}
          >
            <svg
              aria-hidden="true"
              className={`w-5 h-5 ${action === 'delete' ? 'text-gray-400' : 'text-green-500'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <svg
            className={`text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto ${
              action === 'delete' ? 'text-gray-400' : 'text-green-500'
            }`}
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to {action === 'delete' ? 'delete' : 'update'} this item?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={toggleModal}
            >
              No, cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:focus:ring-red-900 ${
                action === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleAction}
            >
              {action === 'delete' ? 'Yes, I\'m sure' : 'Yes, update'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteButton;
