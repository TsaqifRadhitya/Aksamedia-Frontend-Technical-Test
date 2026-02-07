import type { ReactNode } from "react";
import { Notification } from "./index";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Notification />
    </>
  );
};
