import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"
import { deleteEmployee } from "../../../../../modules/employee"
import { queryClient } from "../../../../App"

export const useDeleteEmployee = (id?: string) => {
    return useMutation({
        mutationKey: [QUERY_KEY.EMPLOYEES.DESTROY],
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.EMPLOYEES.INDEX]
            })

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.EMPLOYEES.SHOW, id]
            })
        }
    })
}