import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../../hooks/useSession";
import { usePostLogin } from "./hooks/use-post-login";
import { Button } from "../../../../components/Button";
import { Label } from "../../../../components/Label";
import { Input } from "../../../../components/Input";
import { loginValidator } from "../../../../../modules/auth/schema";
import Cookies from "js-cookie";
import { useGetUser } from "../../../authenticated/user/hooks/use-get-user";
import type { TLoginResponseError } from "../../../../../modules/auth/type";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession, Session } = useSession();
  const { mutate, isPending } = usePostLogin();
  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);

  const [form, setForm] = useState<{
    username: string | undefined;
    password: string | undefined;
  }>({
    username: "",
    password: "",
  });

  const [errorForm, setErrorForm] = useState<{
    username: string | undefined;
    password: string | undefined;
  }>();

  useEffect(() => {
    if (Session) {
      navigate("/", { replace: true });
    }
  }, [Session, navigate]);

  const handleSubmit = () => {
    const validate = loginValidator.safeParse(form);
    const error = validate.error?.format();
    setErrorForm({
      password: error?.password?._errors[0],
      username: error?.username?._errors[0],
    });
    if (!validate.success) {
      return;
    }
    mutate(validate.data, {
      onSuccess: (response) => {
        Cookies.set("token", response.data.token);
        setSession(response.data.admin);
      },
      onError: (e: any) => {
        if (e.response) {
          const errorResponse: TLoginResponseError = e.response.data;

          if (e.response.status === 401) {
            setForm((prev) => ({
              username: prev.username,
              password: "",
            }));
          }

          setErrorForm({
            password: errorResponse.error?.password,
            username: errorResponse.error?.username,
          });
        }
      },
    });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen 
                  bg-gray-50 dark:bg-gray-950 transition-colors"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md p-8 
                 bg-white dark:bg-gray-900 
                 shadow-lg dark:shadow-black/40 
                 rounded-xl space-y-5 
                 transition-colors"
      >
        <h1
          className="text-2xl font-semibold text-center mb-6 
                     text-gray-900 dark:text-gray-100"
        >
          Login
        </h1>

        <div>
          <Label>Username</Label>
          <Input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={isPending}
            className="w-full"
            value={form.username}
          />
          {errorForm?.username && (
            <Label variant="error">{errorForm.username}</Label>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={isPending}
            className="w-full"
            value={form.password}
          />
          {errorForm?.password && (
            <Label variant="error">{errorForm.password}</Label>
          )}
        </div>

        <Button
          disabled={isPending}
          variant="primary"
          className="w-full shadow"
          type="submit"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
