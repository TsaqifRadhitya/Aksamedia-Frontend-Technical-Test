import type { TUser } from "../../../modules/user/type"

export type TUseSession = {
    Session?: TUser
    clearSession: () => void
    setSession: (session: TUser) => void
}