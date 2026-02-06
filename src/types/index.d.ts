export type ApiResponseSuccessType<T> = {
    status : number
    message : string
    data : T
}

export type ApiResponseErrorType<T> = {
    status : number
    message : string
    error : T
}

export type ValidatioErrorType<T> = {
    [K in keyof T]?: string
}