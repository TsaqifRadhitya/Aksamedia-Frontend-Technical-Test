import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../../../../hooks/useSession";
import { usePostLogin } from "./hooks/use-post-login";
import { Button } from "../../../../components/Button";
import { Label } from "../../../../components/Label";
import { Input } from "../../../../components/Input";
import { loginValidator } from "../../../../../modules/auth/schema";
import Cookies from "js-cookie";
import type { TLoginResponseError } from "../../../../../modules/auth/type";
import { useNotification } from "../../../../hooks/useNotification";

export default function LoginPage() {
  const { setSession } = useSession();
  const { mutate, isPending } = usePostLogin();
  const { show } = useNotification();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorForm, setErrorForm] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleSubmit = () => {
    const validate = loginValidator.safeParse(form);

    if (!validate.success) {
      const error = validate.error.format();
      setErrorForm({
        username: error.username?._errors[0],
        password: error.password?._errors[0],
      });
      return;
    }

    mutate(validate.data, {
      onSuccess: (response) => {
        Cookies.set("token", response.data.token);
        setSession(response.data.admin);
        show("Login Success", "success");
      },
      onError: (e: any) => {
        if (e.response) {
          const errorResponse: TLoginResponseError = e.response.data;

          if (e.response.status === 401) {
            setForm((prev) => ({
              ...prev,
              password: "",
            }));
          }

          setErrorForm({
            username: errorResponse.error?.username,
            password: errorResponse.error?.password,
          });
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 w-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center text-black dark:text-white">Login</h1>

        <div>
          <Label>Username</Label>
          <Input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={isPending}
          />
          {errorForm.username && (
            <Label variant="error">{errorForm.username}</Label>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={isPending}
          />
          {errorForm.password && (
            <Label variant="error">{errorForm.password}</Label>
          )}
        </div>

        <Button
          disabled={isPending}
          type="submit"
          variant="primary"
          className="w-full"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
