import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"
import { updateEmployee } from "../../../../../modules/employee"
import { queryClient } from "../../../../App"

export const useUpdateEmployee = (id?: string) => {
    return useMutation({
        mutationKey: [QUERY_KEY.EMPLOYEES.UPDATE],
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.EMPLOYEES.SHOW, id]
            })
        }
    })
}