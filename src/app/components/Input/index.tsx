import { useState, forwardRef } from "react";
import { cn } from "../../../utils/cn";
import type { Props } from "./type";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Label } from "../Label";

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      onChange,
      type = "text",
      placeholder = "",
      disabled = false,
      value,
      defaultValue,
      onKeyDown,
      error,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    const baseStyles = cn(
      "border rounded-md transition-all duration-200 w-full",
      "bg-white text-gray-900 border-gray-300",
      "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
      "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600",
      "dark:focus:ring-green-500 dark:focus:border-green-500",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
      "dark:disabled:bg-gray-700 dark:disabled:text-gray-400",

      type !== "file" ? "px-3 py-2" : "p-0 pr-3",

      error &&
        "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500",
    );

    const fileInputStyles =
      type === "file"
        ? cn(
            "file:mr-4 file:py-2 file:px-4",
            "file:rounded-l-md file:border-0",
            "file:text-sm file:font-semibold",
            "file:bg-gray-100 file:text-gray-700",
            "dark:file:bg-gray-700 dark:file:text-gray-200",
            "hover:file:bg-gray-200 dark:hover:file:bg-gray-600",
            "cursor-pointer text-sm text-gray-500 dark:text-gray-400",
          )
        : "";

    return (
      <div className="w-full">
        <div className="relative w-full">
          <input
            ref={ref}
            {...props}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={cn(
              baseStyles,
              fileInputStyles,
              type === "password" && "pr-10",
              className,
            )}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                "focus:outline-none",
                disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              )}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && <Label variant="error">{error}</Label>}
      </div>
    );
  },
);
