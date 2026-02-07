import 'dotenv'
import Axios from "axios"
import Cookies from "js-cookie";

export const axios = () => Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
    },
})