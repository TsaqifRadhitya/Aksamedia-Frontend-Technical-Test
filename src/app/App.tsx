import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/guest/auth/login/page";
import AuthLayout from "./layout/auth-layout";
import MainPage from "./pages/authenticated/main/page";
import UserPage from "./pages/authenticated/user/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./layout/base-layout";
import GuestLayout from "./layout/guest-layout";
import { useEffect } from "react";
import { useSession } from "./hooks/useSession";
import { ROUTES } from "../constants/routes";

export const queryClient = new QueryClient();

function App() {
  const { bootstrap } = useSession();
  useEffect(() => {
    bootstrap();
  }, [bootstrap]);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<BaseLayout />}>
          <>
            <Route element={<GuestLayout />}>
              <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route index element={<MainPage />} />
              <Route path={ROUTES.USER} element={<UserPage />} />
            </Route>
          </>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
