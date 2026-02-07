import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';
import { Card, CardTitle } from './ui/Card';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
}

const Modal = ({ isOpen, onClose, hideHeader, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-[100] flex justify-center items-center w-full h-full bg-black/60 backdrop-blur-sm'
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className='relative w-full max-w-lg mx-4'
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-card border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Close Button */}
              <button
                type='button'
                className='absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-white rounded-full hover:bg-white/10 transition-colors'
                onClick={onClose}
              >
                <X className='w-5 h-5' />
              </button>

              {/* Modal Header */}
              {!hideHeader && title && (
                <div className='flex items-center justify-between p-6 border-b border-white/5'>
                  <CardTitle className='text-xl font-medium'>{title}</CardTitle>
                </div>
              )}

              {/* Modal Body */}
              <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
                {children}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
