import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../constants/query-keys"
import { updateUser } from "../../../../../modules/user"
import { queryClient } from "../../../../App"

export const useUpdateUser = () => {
    return useMutation({
        mutationKey: [QUERY_KEY.USER.UPDATE],
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USER.GET]
            })
        }
    })
}