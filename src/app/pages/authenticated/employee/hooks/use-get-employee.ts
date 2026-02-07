import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"
import { getEmployees } from "../../../../../modules/employee"
import type { TEmployeesRequest } from "../../../../../modules/employee/type"

export const useGetEmployees = (payload: TEmployeesRequest) => {
    return useQuery({
        queryKey: [QUERY_KEY.EMPLOYEES.INDEX,payload],
        queryFn: () => getEmployees(payload)
    })
}