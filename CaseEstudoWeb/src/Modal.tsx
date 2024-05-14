import React from 'react';
import { IoMdClose } from 'react-icons/io';
import {motion} from 'framer-motion'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalVariants = {
    hidden: {
      y: '100%', // Initially, the modal is off-screen at the bottom
      x: '-50%'
    },
    visible: {
      y: '-40%', // Moves the modal to the middle of the screen
      transition: {
        type: 'spring', // You can adjust the type of animation as needed
        damping: 20,
        stiffness: 260,
      },
    },
  };

  return (
    <motion.div
    
    initial="hidden" // Initially hidden
    animate={isOpen ? 'visible' : 'hidden'} // Conditionally animate based on isOpen prop
    variants={modalVariants} // Apply animation variants
      className="fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-3xl p-4 w-11/12   max-w-md h-[45vh]">
      <div className="flex justify-end">
        <button onClick={onClose}>
          <IoMdClose className="text-gray-700 text-3xl" />
        </button>
      </div>
      {children}
    </motion.div>
  );
};

export default Modal;