import { useState } from "react";
import { Button } from "../components/Button";
import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme/type";
import { SettingsIcon } from "lucide-react";
import { useBreakPoint } from "../hooks/useBreakPoint";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeButtons } from "../components/ThemeButton";

export const BaseLayout = () => {
  const { mode, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { isMobile } = useBreakPoint();

  return (
    <div className="flex justify-center w-screen bg-white dark:bg-gray-950 min-h-screen relative">
      <Outlet />
      <Button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 cursor-pointer right-6 w-14 h-14 rounded-full p-0 text-xl shadow-lg flex items-center justify-center z-50"
        variant="primary"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <SettingsIcon />
        </motion.div>
      </Button>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40">
            {" "}
            {isMobile ? (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-80 p-6 space-y-4 relative z-10"
                >
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Choose Theme
                  </h2>
                  <div className="space-y-2">
                    <ThemeButtons mode={mode} setTheme={setTheme} />
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="absolute inset-0" onClick={() => setOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed bottom-24 right-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl w-72 p-4 space-y-3 origin-bottom-right"
                >
                  <h2 className="text-md font-semibold text-gray-800 dark:text-white">
                    Theme
                  </h2>
                  <ThemeButtons mode={mode} setTheme={setTheme} />
                </motion.div>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
