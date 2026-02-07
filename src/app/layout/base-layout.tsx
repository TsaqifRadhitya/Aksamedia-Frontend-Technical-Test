import { useState } from "react";
import { Button } from "../components/Button";
import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme/type";
import { SettingsIcon } from "lucide-react";
import { useBreakPoint } from "../hooks/useBreakPoint";

export const BaseLayout = () => {
  const { mode, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { isMobile } = useBreakPoint();

  return (
    <div className="flex justify-center w-screen">
      <Outlet />
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 cursor-pointer right-6 w-14 h-14 rounded-full p-0 text-xl shadow-lg flex items-center justify-center"
        variant="primary"
      >
        <SettingsIcon />
      </Button>
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-50">
          {isMobile ? (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-80 p-6 space-y-4 transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Choose Theme
                </h2>

                <div className="space-y-2">
                  <Button
                    onClick={() => setTheme("light")}
                    variant={mode === "light" ? "primary" : "default"}
                    className="w-full justify-start cursor-pointer"
                  >
                    Light
                  </Button>

                  <Button
                    onClick={() => setTheme("dark")}
                    variant={mode === "dark" ? "primary" : "default"}
                    className="w-full justify-start cursor-pointer"
                  >
                    Dark
                  </Button>

                  <Button
                    onClick={() => setTheme("system")}
                    variant={mode === "system" ? "primary" : "default"}
                    className="w-full justify-start cursor-pointer"
                  >
                    System (Follow OS)
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* DESKTOP → Popover di atas button */
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-24 right-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl w-72 p-4 space-y-3"
            >
              <h2 className="text-md font-semibold text-gray-800 dark:text-white">
                Theme
              </h2>

              <Button
                onClick={() => setTheme("light")}
                variant={mode === "light" ? "primary" : "default"}
                className="w-full justify-start cursor-pointer"
              >
                Light
              </Button>

              <Button
                onClick={() => setTheme("dark")}
                variant={mode === "dark" ? "primary" : "default"}
                className="w-full justify-start cursor-pointer"
              >
                Dark
              </Button>

              <Button
                onClick={() => setTheme("system")}
                variant={mode === "system" ? "primary" : "default"}
                className="w-full justify-start cursor-pointer"
              >
                System
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
