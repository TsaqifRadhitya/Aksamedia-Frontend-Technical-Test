import type { ApiResponseSuccessType } from "../../types"

export type TUser = {
    id: string
    name: string
    username: string
    phone: string
    email: string
}

export type TUserResponse = ApiResponseSuccessType<TUser>