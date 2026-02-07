import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"

export const useUpdateEmployee = () => {
    return useMutation({
        mutationKey: [QUERY_KEY.EMPLOYEES.UPDATE],
    })
}