import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: '100%', // Initially, the modal is off-screen at the bottom
    },
    visible: {
      opacity: 1,
      y: 0, // Moves the modal to the middle of the screen
      transition: {
        type: 'spring', // You can adjust the type of animation as needed
        damping: 20,
        stiffness: 260,
      },
    },
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial="hidden" // Initially hidden
          animate="visible" // Conditionally animate based on isOpen prop
          variants={modalVariants} // Apply animation variants
          className="fixed inset-0 flex justify-center items-center z-50 "
        >
          <div className="bg-white rounded-3xl p-4 w-11/12 max-w-md h-[45vh] overflow-y-auto">
            <div className="flex justify-end">
              <button onClick={onClose}>
                <IoMdClose className="text-gray-700 text-3xl" />
              </button>
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
