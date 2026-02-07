import { cn } from "../../../utils/cn";
import type { Props } from "./type";

export const Input = ({
  className,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
}: Props) => {
  const baseStyles =
    "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200";

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        baseStyles,
        disabled && "bg-gray-100 cursor-not-allowed",
        className,
      )}
      onChange={onChange}
    />
  );
};
