export const ENPOINTS = {
    LOGIN: "/api/login",
    LOGOUT: "/api/logout",

    DIVISION: "/api/divisions",

    EMPLOYEES: "/api/employees",
    CREATE_EMPLOYEES: "/api/employees",
    SHOW_EMPLOYEES: (id: string) => `/api/employees/${id}`,
    UPDATE_EMPLOYEES: (id: string) => `/api/employees/${id}`,
    DELETE_EMPLOYEES: (id: string) => `/api/employees/${id}`,

    USER: "/api/user",
    USER_UPDATE : "/api/user/update"
}