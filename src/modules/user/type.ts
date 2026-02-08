import type z from "zod"
import type { ApiResponseSuccessType, ValidatioErrorResponseType, ValidatioErrorType } from "../../types"
import type { UpdateUserValidator } from "./shema"

export type TUser = {
    id: string
    name: string
    username: string
    phone: string
    email: string
}

export type TUserResponse = ApiResponseSuccessType<TUser>

export type TUserUpdatePayload = z.infer<typeof UpdateUserValidator>

export type TUserValidationException = ValidatioErrorType<TUserUpdatePayload>
export type TUserValidationExceptionResponse = ValidatioErrorResponseType<TUserUpdatePayload>