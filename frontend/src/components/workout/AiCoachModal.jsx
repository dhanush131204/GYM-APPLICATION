import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import AiCoach from './AiCoach';

const AiCoachModal = ({ isOpen, onClose, exerciseName }) => {
    // Prevent scrolling when open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-[#111214] rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111214]">
                        <div className="flex items-center gap-3">
                            <span className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                AI Coach <span className="text-slate-400 font-normal ml-2 hidden sm:inline">| {exerciseName}</span>
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a0a0b]">
                        <AiCoach exerciseName={exerciseName} />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default AiCoachModal;
