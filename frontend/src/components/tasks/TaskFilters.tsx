import { MenuItem, Stack, TextField } from "@mui/material";
import type { TaskFiltersState } from "../../types/task";

interface TaskFiltersProps {
  filters: TaskFiltersState;
  onChange: (filters: TaskFiltersState) => void;
}

export default function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <TextField
        select
        label="Estado"
        value={filters.completed}
        onChange={(e) => onChange({ ...filters, completed: e.target.value as TaskFiltersState["completed"] })}
        fullWidth
      >
        <MenuItem value="all">Todos</MenuItem>
        <MenuItem value="true">Completadas</MenuItem>
        <MenuItem value="false">Pendientes</MenuItem>
      </TextField>

      <TextField
        select
        label="Prioridad"
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value as TaskFiltersState["priority"] })}
        fullWidth
      >
        <MenuItem value="all">Todas</MenuItem>
        <MenuItem value="LOW">Baja</MenuItem>
        <MenuItem value="MEDIUM">Media</MenuItem>
        <MenuItem value="HIGH">Alta</MenuItem>
      </TextField>

      <TextField
        label="Fecha límite"
        type="date"
        value={filters.dueDate}
        onChange={(e) => onChange({ ...filters, dueDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </Stack>
  );
}