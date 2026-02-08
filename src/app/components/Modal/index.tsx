import { cn } from "../../../utils/cn";
import type { Props } from "./type";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface ModalTriggerProps extends Props {
  onClose: () => void;
}

export const ModalTrigger = ({
  children,
  TriggerComponent,
  className,
  isOpen,
  onClose,
  bgClassName,
}: ModalTriggerProps) => {
  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {TriggerComponent}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-overlay"
            onClick={onClose}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
              bgClassName,
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              key="modal-content"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex flex-col p-6 rounded-xl shadow-2xl border w-full max-w-lg bg-white relative overflow-hidden",
                "text-gray-900 border-gray-200",
                "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800",
                className,
              )}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
