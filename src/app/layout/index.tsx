import { Outlet, useNavigate } from "react-router-dom";
import { useGetUser } from "../pages/authenticated/user/hooks/use-get-user";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const { isLoading, isError } = useGetUser();

  useEffect(() => {
    if (isError) {
      navigate("/login", { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return <Outlet />;
}
