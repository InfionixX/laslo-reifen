import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: string;
}

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }: ModalProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={clsx("bg-brand-gray border border-gray-700 rounded-xl p-8 w-full max-h-[90vh] overflow-y-auto relative shadow-2xl", maxWidth)}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-brand-orange transition-colors">
                            <FaXmark className="text-2xl" />
                        </button>
                        {title && <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">{title}</h2>}
                        <div className="text-gray-300">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
