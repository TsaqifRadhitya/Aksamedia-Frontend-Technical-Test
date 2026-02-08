import { useState, useRef, useEffect } from "react";
import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLogout } from "../../pages/authenticated/hooks/use-logout";
import { ModalTrigger } from "../Modal";
import { Button } from "../Button";
import { useNotification } from "../../hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";
import { LogOutIcon, UserIcon } from "lucide-react";

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
        setLogoutModalOpen(false);
      },
    });
  };

  const handleGoToProfile = () => {
    navigate("/user");
    setDropdownOpen(false);
  };

  const onLogoutClick = () => {
    setDropdownOpen(false);
    setLogoutModalOpen(true);
  };

  return (
    <div className="w-full h-16 bg-white left-0 fixed top-0 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center px-6 transition-colors justify-center z-40">
      <div className="max-w-7xl flex items-center justify-between w-full">
        <div className="font-semibold text-lg text-gray-800 dark:text-gray-100 tracking-tight">
          Employee's Management
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition cursor-pointer flex items-center gap-x-3 outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-green-500 text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
              {getInitials(Session?.name)}
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {Session?.name}
            </span>
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden origin-top-right z-50 py-1"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {Session?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Administrator
                  </p>
                </div>

                <div className="p-1">
                  <button
                    onClick={handleGoToProfile}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200 flex items-center gap-2"
                  >
                    <UserIcon size={16} />
                    Profile
                  </button>
                  <button
                    onClick={onLogoutClick}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition flex items-center gap-2"
                  >
                    <LogOutIcon size={16} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ModalTrigger
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          TriggerComponent={<></>}
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to end your session?
            </p>
            <div className="flex justify-end gap-3 pt-2">
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
      </div>
    </div>
  );
};
