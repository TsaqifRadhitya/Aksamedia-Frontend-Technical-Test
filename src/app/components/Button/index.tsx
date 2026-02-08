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
  const baseStyles = cn(
    "inline-flex cursor-pointer items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-400",
    "focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950",
    "disabled:opacity-50 disabled:pointer-events-none"
  );

  const variantStyles = {
    default:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 " +
      "dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",

    primary:
      "bg-green-600 text-white hover:bg-green-700 " +
      "dark:bg-green-600 dark:hover:bg-green-700",

    secondary:
      "bg-blue-600 text-white hover:bg-blue-700 " +
      "dark:bg-blue-600 dark:hover:bg-blue-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700 " +
      "dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800",

    bordered:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 " +
      "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && "cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};