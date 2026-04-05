import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import type { Board } from "../../types/board";
import type { TaskPriority } from "../../types/task";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  boards: Board[];
  selectedBoardId: number | null;
  onSubmit: (data: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string | null;
    boardId: number;
  }) => Promise<void>;
}

export default function CreateTaskDialog({
  open,
  onClose,
  boards,
  selectedBoardId,
  onSubmit,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [boardId, setBoardId] = useState<number>(boards[0]?.id ?? 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBoardId) {
      setBoardId(selectedBoardId);
    } else if (boards[0]?.id) {
      setBoardId(boards[0].id);
    }
  }, [selectedBoardId, boards]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({
        title,
        description,
        priority,
        dueDate: dueDate || null,
        boardId,
      });
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear tarea</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
          <TextField select label="Prioridad" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} fullWidth>
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
          <TextField select label="Board" value={boardId || ""} onChange={(e) => setBoardId(Number(e.target.value))} fullWidth>
            {boards.map((board) => (
              <MenuItem key={board.id} value={board.id}>
                {board.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading || !title.trim() || !boardId}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}