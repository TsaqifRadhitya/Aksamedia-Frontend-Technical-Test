import { cn } from "../../../utils/cn";
import type { Props } from "./type";

export const Input = ({
  className,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  value,
  defaultValue,
  onKeyDown,
}: Props) => {
  const baseStyles =
    "px-3 py-2 border rounded-md transition-all duration-200 w-full " +
    "bg-white text-gray-900 border-gray-300 " +
    "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 " +
    "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 " +
    "dark:focus:ring-green-500 dark:focus:border-green-500 " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={cn(
        baseStyles,
        disabled &&
          "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400",
        className,
      )}
    />
  );
};
