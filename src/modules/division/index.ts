import axios from "axios";
import type { TDivisionRequest, TDivisionsResponse } from "./type";
import { ENPOINTS } from "../../constants/end-points";

export const getAllDivision = async (payload: TDivisionRequest): Promise<TDivisionsResponse> => {
    const request = await axios.get(ENPOINTS.DIVISION, {
        params: payload
    })
    return request.data
}