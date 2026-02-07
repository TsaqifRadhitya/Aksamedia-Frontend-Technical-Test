
import type { TLoginRequest, TLoginResponseSuccess, TLogoutResponse } from "./type"
import { ENPOINTS } from "../../constants/end-points"
import { axios } from "../../libs/axios"

export const login = async (payload: TLoginRequest): Promise<TLoginResponseSuccess> => {
    const request = await axios().post(ENPOINTS.LOGIN, payload)
    return request.data
}

export const logout = async (): Promise<TLogoutResponse> => {
    const request = await axios().delete(ENPOINTS.LOGOUT)
    return request.data
} 