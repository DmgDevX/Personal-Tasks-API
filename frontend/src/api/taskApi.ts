import { api } from "./axios";
import type {
  CreateTaskRequest,
  Task,
  TaskPriority,
  UpdateTaskRequest,
} from "../types/task";

interface GetTasksParams {
  completed?: boolean;
  priority?: TaskPriority;
  dueDate?: string;
}

export async function getMyTasks(params?: GetTasksParams): Promise<Task[]> {
  const response = await api.get<Task[]>("/tasks", { params });
  return response.data;
}

export async function getTasksByBoard(boardId: number): Promise<Task[]> {
  const response = await api.get<Task[]>(`/tasks/board/${boardId}`);
  return response.data;
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const response = await api.post<Task>("/tasks", data);
  return response.data;
}

export async function updateTask(taskId: number, data: UpdateTaskRequest): Promise<Task> {
  const response = await api.put<Task>(`/tasks/${taskId}`, data);
  return response.data;
}

export async function completeTask(taskId: number): Promise<Task> {
  const response = await api.patch<Task>(`/tasks/${taskId}/complete`);
  return response.data;
}

export async function deleteTask(taskId: number): Promise<void> {
  await api.delete(`/tasks/${taskId}`);
}