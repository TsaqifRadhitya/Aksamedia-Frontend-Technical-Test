import { useState, useRef, useEffect } from "react";
import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLogout } from "../../pages/authenticated/hooks/use-logout";
import { ModalTrigger } from "../Modal";
import { Button } from "../Button";
import { useNotification } from "../../hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";

const getInitials = (name?: string) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

export const Navbar = () => {
  const { Session, clearSession } = useSession();
  const navigate = useNavigate();
  const { mutate } = useLogout();
  const { show } = useNotification();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        Cookies.remove("token");
        clearSession();
        show("Logout Success", "success");
      },
    });
  };

  const handleGoToProfile = () => {
    navigate("/user");
    setDropdownOpen(false);
  };

  return (
    <div className="w-full h-16 bg-white left-0 fixed top-0 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center px-6 transition-colors justify-center z-50">
      <div className="max-w-7xl flex items-center justify-between w-full">
        <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          Employee's Management
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 transition cursor-pointer flex items-center gap-x-2.5"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-green-500 text-white dark:bg-green-600">
              {getInitials(Session?.username)}
            </div>
            <span>{Session?.username}</span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2.5 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={handleGoToProfile}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white cursor-pointer"
                >
                  Profile
                </button>

                <ModalTrigger
                  isOpen={logoutModalOpen}
                  onClose={() => setLogoutModalOpen(false)}
                  TriggerComponent={
                    <Button
                      onClick={() => setLogoutModalOpen(true)}
                      className="w-full text-left px-4 py-2 text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                    >
                      Logout
                    </Button>
                  }
                  className="w-1/3"
                >
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Confirm Logout</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Are you sure you want to logout?
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="bordered"
                        onClick={() => setLogoutModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </ModalTrigger>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
