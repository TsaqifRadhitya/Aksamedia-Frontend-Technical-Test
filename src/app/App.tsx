import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/guest/auth/login/page";
import AuthLayout from "./layout/index";
import EmployeesPage from "./pages/authenticated/employee/page";
import MainPage from "./pages/authenticated/main/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./layout/base-layout";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<BaseLayout />}>
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AuthLayout />}>
              <Route index element={<MainPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/user" element />
            </Route>
          </>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
