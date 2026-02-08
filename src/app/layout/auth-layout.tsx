import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { Navbar } from "../components/navbar";
import { useEffect } from "react";

export default function Layout() {
  const { Session, isLoading } = useSession();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  useEffect(() => {
    if (!isLoading && !Session) {
      navigate("/login");
    }
  }, [Session, isLoading]);

  return (
    <div className="min-h-screen w-screen items-center flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
