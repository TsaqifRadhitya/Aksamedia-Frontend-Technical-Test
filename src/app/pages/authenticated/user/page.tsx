import { useSession } from "../../../hooks/useSession";
import { Label } from "../../../components/Label";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  AtSignIcon,
  LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalTrigger } from "../../../components/Modal";
import { useEffect, useState } from "react";
import type { TUser } from "../../../../modules/user/type";
import { ROUTES } from "../../../../constants/routes";

export default function Page() {
  const { Session, isLoading, clearSession } = useSession();
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser>();

  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    clearSession();
    navigate(ROUTES.AUTH.LOGIN);
  };

  useEffect(() => {
    if (Session) {
      setUser(Session);
    }
  }, [Session]);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!Session) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <p className="text-gray-500">You are not logged in.</p>
        <Button onClick={() => navigate(ROUTES.AUTH.LOGIN)}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl pt-10 px-4 mx-auto min-h-[90vh] justify-center">
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-linear-to-r from-green-400 to-emerald-600 dark:from-green-900 dark:to-emerald-900 relative"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-4 gap-4">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 p-1.5 shadow-md">
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-300">
                {getInitials(user?.name)}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user?.username}
              </p>
            </div>

            <ModalTrigger
              isOpen={isOpenModal}
              onClose={() => setOpenModal(false)}
              TriggerComponent={
                <Button
                  variant="danger"
                  onClick={() => setOpenModal(true)}
                  className="flex items-center gap-2"
                >
                  <LogOutIcon size={16} />
                  Logout
                </Button>
              }
            >
              {" "}
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
                    onClick={() => setOpenModal(false)}
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
      </div>

      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <UserIcon size={14} className="text-gray-500" />
              Full Name
            </Label>
            <Input
              value={user?.name}
              disabled
              className="bg-gray-50 dark:bg-gray-800/50 cursor-default"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AtSignIcon size={14} className="text-gray-500" />
              Username
            </Label>
            <Input
              value={user?.username}
              disabled
              className="bg-gray-50 dark:bg-gray-800/50 cursor-default"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MailIcon size={14} className="text-gray-500" />
              Email Address
            </Label>
            <Input
              value={user?.email}
              disabled
              className="bg-gray-50 dark:bg-gray-800/50 cursor-default"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <PhoneIcon size={14} className="text-gray-500" />
              Phone Number
            </Label>
            <Input
              value={user?.phone}
              disabled
              className="bg-gray-50 dark:bg-gray-800/50 cursor-default"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
              User ID
            </Label>
            <div className="font-mono text-xs text-gray-500 dark:text-gray-600 bg-gray-50 dark:bg-gray-950 p-2 rounded border border-gray-100 dark:border-gray-800">
              {user?.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
