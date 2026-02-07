import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUser } from "../pages/authenticated/user/hooks/use-get-user";
import { useSession } from "../hooks/useSession";
import { Navbar } from "../components/navbar";

export default function Layout() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetUser();
  const { Session, setSession, clearSession } = useSession();

  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data, setSession]);

  useEffect(() => {
    if ((error as any)?.response?.status === 401) {
      clearSession();
      navigate("/login", { replace: true });
    }
  }, [error, clearSession, navigate]);

  if (isLoading && !Session) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-950 transition-colors">
        <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      <Outlet />
    </div>
  );
}
