import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../../constants/query-keys";
import { getUser } from "../../../../../modules/user";
import Cookies from "js-cookie";

export const useGetUser = () => {
    const token = Cookies.get("token");

    return useQuery({
        queryKey: [QUERY_KEY.USER],
        queryFn: getUser,
        retry: false,
        enabled: !!token, // 🔥 ini kuncinya
        select: (response) => response.data,
    });
};
