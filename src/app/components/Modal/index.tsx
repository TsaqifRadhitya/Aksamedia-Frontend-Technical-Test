import { cn } from "../../../utils/cn";
import type { Props } from "./type";
import { motion, AnimatePresence } from "framer-motion";

export const ModalTrigger = ({
  children,
  TriggerComponent,
  className,
  isOpen,
  onClose,
  bgClassName,
}: Props & { onClose?: () => void }) => {
  return (
    <>
      {TriggerComponent}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={onClose}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
              bgClassName,
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex flex-col p-5 rounded-xl shadow-xl border",
                "bg-white text-gray-900 border-gray-200",
                "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800",
                "transition-all duration-200",
                className,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
