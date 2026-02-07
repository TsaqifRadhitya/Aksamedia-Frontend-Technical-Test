import { cn } from "../../../utils/cn";
import type { Props } from "./type";

export const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  disabled = false,
  type,
}: Props) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none";

  const variantStyles = {
    default:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 " +
      "dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",

    primary:
      "bg-green-500 text-white hover:bg-green-600 " +
      "dark:bg-green-600 dark:hover:bg-green-700",

    secondary:
      "bg-blue-500 text-white hover:bg-blue-600 " +
      "dark:bg-blue-600 dark:hover:bg-blue-700",

    danger:
      "bg-red-500 text-white hover:bg-red-600 " +
      "dark:bg-red-600 dark:hover:bg-red-700",

    bordered:
      "border border-gray-400 text-gray-900 hover:bg-gray-100 " +
      "dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
};
