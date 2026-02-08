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
  Edit,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalTrigger } from "../../../components/Modal";
import { useEffect, useState } from "react";
import {
  type TUserUpdatePayload,
  type TUserValidationException,
  type TUserValidationExceptionResponse,
} from "../../../../modules/user/type";
import { ROUTES } from "../../../../constants/routes";
import { UpdateUserValidator } from "../../../../modules/user/shema";
import { useUpdateUser } from "./hooks/use-update-user";
import { useNotification } from "../../../hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const { Session, isLoading, clearSession, setSession } = useSession();
  const navigate = useNavigate();
  const [user, setUser] = useState<TUserUpdatePayload>({
    email: "",
    name: "",
    phone: "",
  });
  const [userError, setUserError] = useState<TUserValidationException>();

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const { mutate, isPending } = useUpdateUser();
  const [isEditUser, setIsEditUser] = useState<boolean>(false);

  const { show } = useNotification();

  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleCancelEditUser = () => {
    if (!Session) return;
    setIsEditUser(false);
    setUser(Session);
    setUserError(undefined);
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

  const handleSaveUser = () => {
    if (!Session || !user) return;
    const validate = UpdateUserValidator.safeParse(user);
    const error = validate.error?.format();
    setUserError({
      email: error?.email?._errors[0] || "",
      name: error?.name?._errors[0] || "",
      phone: error?.phone?._errors[0] || "",
    });

    if (!validate.success) return;
    mutate(user, {
      onSuccess: () => {
        show("Success Update Personal Information", "success");
        setSession({ ...user, id: Session.id, username: Session.username });
        setIsEditUser(false);
        setShowConfirmModal(false);
      },
      onError: (e: any) => {
        if (e.response) {
          const errorResponse: TUserValidationExceptionResponse =
            e.response.data.error;

          setUserError({
            email: errorResponse?.email?.[0],
            name: errorResponse?.name?.[0],
            phone: errorResponse?.phone?.[0],
          });
        }
      },
    });
  };

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
    <div className="flex flex-col items-center w-full max-w-4xl pt-10 px-4 mx-auto min-h-[90vh] mt-20 gap-2.5">
      <div
        onClick={() => navigate(ROUTES.HOME)}
        className="w-full dark:text-white flex items-center gap-2.5 font-bold cursor-pointer"
      >
        <ArrowLeft />
        <h1 className="text-2xl">Back to Employee List</h1>
      </div>
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-linea-to-r from-green-400 to-emerald-600 dark:from-green-900 dark:to-emerald-900 relative"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-4 gap-4">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 p-1.5 shadow-md">
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-300">
                {getInitials(Session?.name)}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {Session?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{Session?.username}
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
                    Confirm
                  </Button>
                </div>
              </div>
            </ModalTrigger>
          </div>
        </div>
      </div>

      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg flex items-center justify-between font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
          Personal Information
          <Edit
            className="cursor-pointer hover:text-green-500 transition-colors"
            onClick={() => setIsEditUser(true)}
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <UserIcon size={14} className="text-gray-500" />
              Full Name
            </Label>
            <Input
              value={user?.name}
              disabled={!isEditUser}
              className="bg-gray-50 dark:bg-gray-800/50"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              error={userError?.name}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AtSignIcon size={14} className="text-gray-500" />
              Username
            </Label>
            <Input
              value={Session?.username}
              disabled
              className="bg-gray-50 dark:bg-gray-800/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MailIcon size={14} className="text-gray-500" />
              Email Address
            </Label>
            <Input
              value={user?.email}
              disabled={!isEditUser}
              className="bg-gray-50 dark:bg-gray-800/50"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              error={userError?.email}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <PhoneIcon size={14} className="text-gray-500" />
              Phone Number
            </Label>
            <Input
              value={user?.phone}
              disabled={!isEditUser}
              className="bg-gray-50 dark:bg-gray-800/50"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, phone: e.target.value }))
              }
              error={userError?.phone}
            />
          </div>

          <div className="md:col-span-2 overflow-hidden">
            <AnimatePresence>
              {isEditUser && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-2.5 pt-2"
                >
                  <ModalTrigger
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    TriggerComponent={
                      <Button
                        disabled={isPending}
                        onClick={() => setShowConfirmModal(true)}
                        className="w-full"
                        variant="primary"
                      >
                        Save
                      </Button>
                    }
                  >
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Confirm Save Profile Data
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want save your profile change ?
                      </p>
                      <div className="flex justify-end gap-3 pt-2">
                        <Button
                          variant="bordered"
                          onClick={() => setShowConfirmModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="danger" onClick={handleSaveUser}>
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </ModalTrigger>
                  <Button
                    className="w-full"
                    variant="bordered"
                    disabled={isPending}
                    onClick={handleCancelEditUser}
                  >
                    Cancel
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
              User ID
            </Label>
            <div className="font-mono text-xs text-gray-500 dark:text-gray-600 bg-gray-50 dark:bg-gray-950 p-2 rounded border border-gray-100 dark:border-gray-800">
              {Session.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
