import { Stack } from "@mui/material";
import type { Task } from "../../types/task";
import EmptyState from "../common/EmptyState";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: number) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => Promise<void>;
}

export default function TaskList({ tasks, onComplete, onEdit, onDelete }: TaskListProps) {
  if (!tasks.length) {
    return (
      <EmptyState
        title="No hay tareas"
        subtitle="Prueba creando una tarea o ajustando los filtros actuales."
      />
    );
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}