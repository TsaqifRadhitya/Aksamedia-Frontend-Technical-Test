import { ENPOINTS } from "../../constants/end-points";
import { axios } from "../../libs/axios";
import type { TUserResponse } from "./type";

export const getUser = async (): Promise<TUserResponse> => {
    const request = await axios().get(ENPOINTS.USER)
    return request.data
}