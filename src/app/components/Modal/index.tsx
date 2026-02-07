import { cn } from "../../../utils/cn";
import type { Props } from "./type";

export const ModalTrigger = ({
  children,
  TriggerComponent,
  className,
  isOpen,
  onClose,
}: Props & { onClose?: () => void }) => {
  return (
    <>
      {TriggerComponent}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "flex flex-col p-5 rounded-xl shadow-xl border",
              "bg-white text-gray-900 border-gray-200",
              "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800",
              "transition-all duration-200",
              className,
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
