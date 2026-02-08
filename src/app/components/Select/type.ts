import type { SelectHTMLAttributes } from "react";

export type SelectItem = {
    label: string;
    value: any
    disable: boolean
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    items: SelectItem[];
    label?: string;
    error?: string;
    placeholder?: string;
}