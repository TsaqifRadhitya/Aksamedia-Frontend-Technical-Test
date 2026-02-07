import { useMutation } from "@tanstack/react-query"
import { QUERY_KEY } from "../../../../constants/query-keys"
import { logout } from "../../../../modules/auth"
import { queryClient } from "../../../App"

export const useLogout = () => {
    return useMutation({
        mutationKey: [QUERY_KEY.AUTH.LOGOUT],
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USER.GET]
            })
        }
    })
}