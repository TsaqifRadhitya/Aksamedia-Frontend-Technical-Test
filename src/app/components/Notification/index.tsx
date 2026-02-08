import { cn } from "../../../utils/cn";
import { useNotification } from "../../hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";

export const Notification = () => {
  const { notifications, remove } = useNotification();

  return (
    <div className="fixed top-6 right-6 z-999 space-y-3 w-sm">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.25 }}
            layout
            className={cn(
              "relative overflow-hidden px-4 py-3 rounded-xl shadow-xl border backdrop-blur-sm",
              "bg-white/90 dark:bg-gray-900/90",
              "border-gray-200 dark:border-gray-800",
              "text-sm font-medium",
              "text-gray-800 dark:text-gray-100",
              n.type === "success" &&
                "border-green-500 text-green-600 dark:text-green-400",
              n.type === "error" &&
                "border-red-500 text-red-600 dark:text-red-400",
              n.type === "info" &&
                "border-blue-500 text-blue-600 dark:text-blue-400",
            )}
            onClick={() => remove(n.id)}
          >
            {n.message}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className={cn(
                "absolute bottom-0 left-0 h-1.25",
                n.type === "success" && "bg-green-500",
                n.type === "error" && "bg-red-500",
                n.type === "info" && "bg-blue-500",
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
