import { api } from "../api/axios";
import type { ApiResponse } from "../types/api.types";
import type {
  CreateTaskPayload,
  TaskListResponse,
  TaskStatus,
} from "../types/task.types";

export const getTasks = async (params?: {
  status?: TaskStatus;
  search?: string;
}): Promise<TaskListResponse> => {
  const response = await api.get<ApiResponse<TaskListResponse>>("/tasks", {
    params,
  });

  return response.data.data;
};

export const createTask = async (data: CreateTaskPayload) => {
  const response = await api.post("/tasks", data);
  return response.data.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
  const response = await api.patch(`/tasks/${id}`, { status });
  return response.data.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data.data;
};
