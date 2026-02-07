import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../../../constants/query-keys"
import { login } from "../../../../../../modules/auth"
import { queryClient } from "../../../../../App"

export const usePostLogin = () => {
    return useMutation({
        mutationKey: [QUERY_KEY.AUTH.LOGIN],
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USER.GET]
            })
        }
    })
}