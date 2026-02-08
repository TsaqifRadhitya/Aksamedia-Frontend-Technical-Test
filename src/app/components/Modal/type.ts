import type { ReactNode } from "react"

export type Props = {
    TriggerComponent: ReactNode
    children: ReactNode
    isOpen: boolean
    className?: string
    bgClassName? : string
}