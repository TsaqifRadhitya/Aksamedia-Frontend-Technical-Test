import { useState, useRef, useEffect } from "react";
import { useSession } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLogout } from "../../pages/authenticated/hooks/use-logout";

export const Navbar = () => {
  const { Session, clearSession } = useSession();
  const navigate = useNavigate();
  const { mutate } = useLogout();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
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
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between px-6 transition-colors">
      <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">
        Dashboard
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {Session?.username}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
