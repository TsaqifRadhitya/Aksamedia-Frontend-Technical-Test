import { cn } from "../../../utils/cn";
import type { Props } from "./type";

export const Button = ({
  children,
  onClick,
  className,
  variant = "default",
  disabled = false,
}: Props) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200";

  const variantStyles = {
    default: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    bordered: "border border-gray-400 text-gray-900 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
};
