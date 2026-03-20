import { api } from "../api/axios";
import type { LoginPayload, LoginResponse } from "../types/auth.types";
import type { ApiResponse } from "../types/api.types";

export const login = async (
  data: LoginPayload
): Promise<LoginResponse> => {

  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    data
  );

  return response.data.data;
};