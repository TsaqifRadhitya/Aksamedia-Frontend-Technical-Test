import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"

export const useGetEmployees = (id?: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.EMPLOYEES.INDEX, id],
        enabled: !!id
    })
}