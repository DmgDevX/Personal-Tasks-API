import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import type { Task } from "../../types/task";
import FuturisticCard from "../common/FuturisticCard";
import { formatDate, getPriorityLabel } from "../../utils/formatters";

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: number) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => Promise<void>;
}

function getPriorityColor(
  priority: Task["priority"]
): "success" | "warning" | "error" {
  switch (priority) {
    case "LOW":
      return "success";
    case "MEDIUM":
      return "warning";
    case "HIGH":
      return "error";
  }
}

export default function TaskCard({
  task,
  onComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <FuturisticCard sx={{ p: { xs: 1.75, sm: 2.2 }, width: "100%" }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "flex-start" }}
          spacing={2}
        >
          <Stack spacing={1} sx={{ minWidth: 0, flex: 1, textAlign: "left" }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                wordBreak: "break-word",
                fontSize: { xs: "1rem", sm: "1.15rem" },
              }}
            >
              {task.title}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                label={task.completed ? "Completada" : "Pendiente"}
                color={task.completed ? "success" : "default"}
              />
              <Chip
                label={getPriorityLabel(task.priority)}
                color={getPriorityColor(task.priority)}
                variant="outlined"
              />
              <Chip
                label={`Vence: ${formatDate(task.dueDate)}`}
                variant="outlined"
              />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            justifyContent={{ xs: "flex-end", sm: "flex-start" }}
            sx={{ flexShrink: 0 }}
          >
            <Tooltip title="Editar">
              <IconButton onClick={() => onEdit(task)}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={() => onDelete(task.id)}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider />

        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: "break-word" }}
          >
            {task.description || "Sin descripción"}
          </Typography>
        </Box>

        {!task.completed && (
          <Stack direction="row" justifyContent={{ xs: "stretch", sm: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<CheckCircleOutlineRoundedIcon />}
              onClick={() => onComplete(task.id)}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Marcar como completada
            </Button>
          </Stack>
        )}
      </Stack>
    </FuturisticCard>
  );
}