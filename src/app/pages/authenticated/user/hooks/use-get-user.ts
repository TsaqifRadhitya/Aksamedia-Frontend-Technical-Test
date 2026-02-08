import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../../constants/query-keys";
import { getUser } from "../../../../../modules/user";

export const useGetUser = () => {
    return useQuery({
        queryKey: [QUERY_KEY.USER],
        queryFn: getUser,
        retry: false,
        select: (response) => response.data,
    });
};
