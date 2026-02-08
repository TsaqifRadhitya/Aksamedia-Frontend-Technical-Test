import type { TEmployee } from "../../../../../../modules/employee/type"

export type TProps = {
    handleFinish: () => void
    data?: TEmployee
}