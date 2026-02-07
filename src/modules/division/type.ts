import type { ApiResponseSuccessType } from "../../types"

export type TDivisionRequest = {
    page?: number
    perpage?: number
    search?: string
}

export type TDivision = {
    id: string
    name: string
}

export type TDivisionsResponse = ApiResponseSuccessType<TDivision[]>