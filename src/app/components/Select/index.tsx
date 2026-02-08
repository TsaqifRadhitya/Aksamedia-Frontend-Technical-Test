import { useState, useRef, useEffect, forwardRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils/cn";
import type { SelectProps } from "./type";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { Label } from "../Label";
import { motion, AnimatePresence } from "framer-motion";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      items,
      placeholder,
      error,
      disabled,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedItem = items.find(
      (item) => String(item.value) === String(value),
    );

    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          left: rect.left + window.scrollX,
          top: rect.bottom + window.scrollY + 4,
          width: rect.width,
        });
      }
    };

    useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
      }
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (newValue: string | number) => {
      if (onChange) {
        const event = {
          target: { value: newValue },
          currentTarget: { value: newValue },
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange(event);
      }
      setIsOpen(false);
    };

    const displayItems = items.filter((item) => !item.disable);

    return (
      <div className="w-full relative">
        <select
          className="sr-only"
          ref={ref}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          ref={triggerRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full px-3 py-2 text-left border rounded-md transition-all duration-200 flex items-center justify-between",
            "bg-white text-gray-900 border-gray-300",
            "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
            "dark:focus:ring-green-500 dark:focus:border-green-500",
            disabled &&
              "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400",
            error && "border-red-500 focus:ring-red-500 dark:border-red-500",
            className,
          )}
        >
          <span
            className={cn(
              "block truncate",
              !selectedItem && "text-gray-400 dark:text-gray-500",
            )}
          >
            {selectedItem
              ? selectedItem.label
              : placeholder || "Select an option"}
          </span>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 text-gray-500 transition-transform duration-200",
              isOpen && "transform rotate-180",
            )}
          />
        </button>

        {createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  zIndex: 9999,
                }}
                className={cn(
                  "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl py-1",
                  "max-h-60 overflow-auto",
                  "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent",
                )}
              >
                {displayItems.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    No options available
                  </div>
                ) : (
                  displayItems.map((item) => {
                    const isSelected = String(item.value) === String(value);
                    return (
                      <button
                        key={item.value}
                        type="button"
                        disabled={item.disable}
                        onClick={() =>
                          !item.disable && handleSelect(item.value)
                        }
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer",
                          "hover:bg-gray-100 dark:hover:bg-gray-800",
                          isSelected
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-medium"
                            : "text-gray-700 dark:text-gray-200",
                        )}
                      >
                        <span>{item.label}</span>
                        {isSelected && <CheckIcon className="h-4 w-4" />}
                      </button>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

        {error && (
          <Label variant="error" className="mt-1">
            {error}
          </Label>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
