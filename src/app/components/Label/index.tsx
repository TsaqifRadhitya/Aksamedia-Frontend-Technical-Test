import { cn } from "../../../utils/cn";
import type { Props } from "./type";

export const Label = ({ children, className, variant = "default" }: Props) => {
  const baseStyles = "block text-sm font-medium mb-1";

  const variantStyles = {
    default: "text-gray-700 dark:text-gray-300",
    error: "text-red-500 dark:text-red-400",
  };

  return (
    <label className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </label>
  );
};
