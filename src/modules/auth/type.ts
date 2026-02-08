import type z from "zod";
import type { ApiResponseErrorType, ApiResponseSuccessType, ValidatioErrorResponseType, ValidatioErrorType } from "../../types";
import type { loginValidator } from "./schema";

export type TUser = {
    id: string
    name: string
    username: string
    phone: string
    email: string
}

export type TLoginResponseSuccess = ApiResponseSuccessType<{
    token: string,
    admin: TUser
}>

export type TLoginResponseError = ApiResponseErrorType<ValidatioErrorResponseType<z.infer<typeof loginValidator>>>

export type TLoginRequest = z.infer<typeof loginValidator>

export type TLogoutResponse = ApiResponseSuccessType<undefined>