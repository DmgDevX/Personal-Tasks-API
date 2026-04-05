import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import type { Task, TaskPriority } from "../../types/task";

interface EditTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSubmit: (
    taskId: number,
    data: {
      title: string;
      description: string;
      priority: TaskPriority;
      dueDate: string | null;
      completed: boolean;
    }
  ) => Promise<void>;
}

export default function EditTaskDialog({
  open,
  task,
  onClose,
  onSubmit,
}: EditTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setDueDate(task.dueDate || "");
    setCompleted(task.completed);
  }, [task]);

  const handleSubmit = async () => {
    if (!task) return;

    setLoading(true);

    try {
      await onSubmit(task.id, {
        title,
        description,
        priority,
        dueDate: dueDate || null,
        completed,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar tarea</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            fullWidth
          />

          <TextField
            select
            label="Prioridad"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            fullWidth
          >
            <MenuItem value="LOW">Baja</MenuItem>
            <MenuItem value="MEDIUM">Media</MenuItem>
            <MenuItem value="HIGH">Alta</MenuItem>
          </TextField>

          <TextField
            label="Fecha límite"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            }
            label="Completada"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !title.trim()}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}