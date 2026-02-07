export type TPagination = {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
    first_page_url: string
    last_page_url: string
    next_page_url?: string
    prev_page_url?: string
}

export type ApiResponseSuccessType<T> = {
    status: number
    message: string
    data: T
    pagination?: TPagination
}

export type ApiResponseErrorType<T> = {
    status: number
    message: string
    error: T
}

export type ValidatioErrorType<T> = {
    [K in keyof T]?: string
}