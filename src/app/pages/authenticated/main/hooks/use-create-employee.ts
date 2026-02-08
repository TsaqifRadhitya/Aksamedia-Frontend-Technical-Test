import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"
import { createEmployee } from "../../../../../modules/employee"
import { queryClient } from "../../../../App"

export const useCreateEmployee = () => {
    return useMutation({
        mutationKey: [QUERY_KEY.EMPLOYEES.STORE],
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.EMPLOYEES.INDEX]
            })
        }
    })
}