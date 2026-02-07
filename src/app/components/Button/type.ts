import type { ReactNode } from "react"

export type ButtonVariant = "default" | "primary" | "secondary" | "bordered" | "danger";

export type Props = {
    children: ReactNode
    onClick: () => void
    className: string
    disabled?: boolean
    variant? : ButtonVariant
}