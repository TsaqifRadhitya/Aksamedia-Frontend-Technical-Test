import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useEffect } from "react";
import { ROUTES } from "../../constants/routes";

export default function GuestLayout() {
  const { isLoading, Session } = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isLoading && Session) {
      const targetUrl = searchParams.get("return_to") || ROUTES.HOME;

      navigate(targetUrl, { replace: true });
    }
  }, [isLoading, Session, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Outlet />
    </div>
  );
}
