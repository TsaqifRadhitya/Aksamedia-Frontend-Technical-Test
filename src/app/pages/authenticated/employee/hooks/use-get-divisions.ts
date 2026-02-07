import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"
import { getAllDivision } from "../../../../../modules/division"
import type { TDivisionRequest } from "../../../../../modules/division/type"

export const useGetDivisions = (payload: TDivisionRequest) => {
    return useQuery({
        queryKey: [QUERY_KEY.DIVISIONS.INDEX, payload],
        queryFn: () => getAllDivision(payload)
    })
}