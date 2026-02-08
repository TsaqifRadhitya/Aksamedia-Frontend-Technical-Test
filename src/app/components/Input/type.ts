import type { HTMLInputTypeAttribute } from "react"

export type Props = {
    className?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type?: HTMLInputTypeAttribute
    disabled?: boolean
    value?: any
    defaultValue?: any
    onKeyDown? : (e : React.KeyboardEvent<HTMLInputElement>) => void
}