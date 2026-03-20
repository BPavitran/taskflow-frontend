export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  items: Task[];
  total: number;
}

export interface CreateTaskPayload {
  title: string
  description?: string
}
