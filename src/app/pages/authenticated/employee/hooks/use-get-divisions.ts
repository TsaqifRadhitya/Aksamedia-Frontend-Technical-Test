import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"

export const useGetDivisions = () => {
    return useQuery({
        queryKey: [QUERY_KEY.DIVISIONS.INDEX],
    })
}