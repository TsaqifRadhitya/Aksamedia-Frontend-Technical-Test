import { ENPOINTS } from "../../constants/end-points";
import { axios } from "../../libs/axios";
import type { TUserResponse, TUserUpdatePayload } from "./type";

export const getUser = async (): Promise<TUserResponse> => {
    const request = await axios().get(ENPOINTS.USER)
    return request.data
}

export const updateUser = async (payload: TUserUpdatePayload): Promise<TUserResponse> => {
    const request = await axios().put(ENPOINTS.USER_UPDATE, payload)
    return request.data
}