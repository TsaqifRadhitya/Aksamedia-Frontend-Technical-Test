import { twMerge, type ClassNameValue } from 'tailwind-merge'

export const cn = (...className: ClassNameValue[]) => {
    return twMerge(...className)
}