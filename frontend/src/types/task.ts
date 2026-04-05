export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  boardId: number;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string | null;
  boardId: number;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string | null;
  completed: boolean;
}

export interface TaskFiltersState {
  completed: "all" | "true" | "false";
  priority: "all" | TaskPriority;
  dueDate: string;
}