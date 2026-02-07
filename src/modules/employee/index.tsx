import type {
  TEmployeeResponse,
  TEmployeesRequest,
  TEmployeesResponse,
} from "./type";
import { ENPOINTS } from "../../constants/end-points";
import type { ApiResponseSuccessType } from "../../types";
import type z from "zod";
import type { EmployeeValidator } from "./schema";
import { axios } from "../../libs/axios";

export const getEmployees = async (
  params: TEmployeesRequest,
): Promise<TEmployeesResponse> => {
  const request = await axios().get(ENPOINTS.EMPLOYEES, {
    params,
  });
  return request.data;
};

export const getEmployee = async (id: string): Promise<TEmployeeResponse> => {
  const request = await axios().get(ENPOINTS.SHOW_EMPLOYEES(id));
  return request.data;
};

export const createEmployee = async ({
  payload,
}: {
  payload: z.infer<typeof EmployeeValidator>;
}): Promise<TEmployeeResponse> => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const request = await axios().post(ENPOINTS.CREATE_EMPLOYEES, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return request.data;
};

export const updateEmployee = async ({
  payload,
  id,
}: {
  payload: z.infer<typeof EmployeeValidator>;
  id: string;
}): Promise<TEmployeeResponse> => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const request = await axios().post(ENPOINTS.UPDATE_EMPLOYEES(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return request.data;
};

export const deleteEmployee = async (
  id: string,
): Promise<ApiResponseSuccessType<never>> => {
  const request = await axios().delete(ENPOINTS.DELETE_EMPLOYEES(id));
  return request.data;
};
