import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1 // optional: stagger inner elements
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
}




const Modal = ({ isOpen, onClose, hideHeader, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className='relative flex items-center flex-col bg-white shadow-lg rounded-lg overflow-hidden mx-4 max-h-[90vh]'
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Header */}
            {!hideHeader && (
              <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
              </div>
            )}

            {/* Close Button */}
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray/25 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer'
              onClick={onClose}
            >
             <X className='text-lg' />
            </button>

            {/* Modal Body */}
            <div className='flex-1 overflow-y-auto custom-scrollbar p-4'>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
