import type z from "zod"
import type { ApiResponseSuccessType, ValidatioErrorResponseType, ValidatioErrorType } from "../../types"
import type { TDivision } from "../division/type"
import type { EmployeeValidator } from "./schema"

export type TEmployee = {
    id: string
    image: string
    name: string
    phone: string
    division: TDivision
    position: string
}

export type TEmployeesRequest = {
    page?: number
    perpage?: number
    name?: string
    division_id?: string
}

export type TEmployeesResponse = ApiResponseSuccessType<{ employees: TEmployee[] }>

export type TEmployeeResponse = ApiResponseSuccessType<TEmployee>

export type TCreateEmployeeRequest = Omit<TEmployee, "image"> & {
    image: File
}

export type TEmployeeValidationException = ValidatioErrorType<z.infer<typeof EmployeeValidator>>

export type TEmployeeValidationExceptionResponse = ValidatioErrorResponseType<z.infer<typeof EmployeeValidator>>