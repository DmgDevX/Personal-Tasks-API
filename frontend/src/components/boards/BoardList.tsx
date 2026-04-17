import {
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { Board } from "../../types/board";
import EmptyState from "../common/EmptyState";

interface BoardListProps {
  boards: Board[];
  selectedBoardId: number | null;
  onSelectBoard: (boardId: number | null) => void;
  onDeleteBoard: (boardId: number) => Promise<void>;
}

export default function BoardList({
  boards,
  selectedBoardId,
  onSelectBoard,
  onDeleteBoard,
}: BoardListProps) {
  if (!boards.length) {
    return (
      <EmptyState
        title="Sin boards"
        subtitle="Crea tu primer board para empezar a organizar tareas."
      />
    );
  }

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.2,
      }}
    >
      <ListItemButton
        selected={selectedBoardId === null}
        onClick={() => onSelectBoard(null)}
        sx={{
          borderRadius: 3,
          alignItems: "flex-start",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <ListItemText
          primary="Todas las tareas"
          secondary="Vista general de todas tus tareas"
          primaryTypographyProps={{ noWrap: false }}
          secondaryTypographyProps={{ sx: { wordBreak: "break-word" } }}
        />
        <Chip
          size="small"
          label="Global"
          color="secondary"
          variant={selectedBoardId === null ? "filled" : "outlined"}
          sx={{ maxWidth: "100%" }}
        />
      </ListItemButton>

      {boards.map((board) => (
        <Stack
          key={board.id}
          direction="row"
          spacing={1}
          alignItems="flex-start"
          sx={{ minWidth: 0 }}
        >
          <ListItemButton
            selected={selectedBoardId === board.id}
            onClick={() => onSelectBoard(board.id)}
            sx={{
              borderRadius: 3,
              alignItems: "flex-start",
              flex: 1,
              minWidth: 0,
            }}
          >
            <ListItemText
              primary={board.name}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ wordBreak: "break-word" }}
                >
                  {board.description || "Sin descripción"}
                </Typography>
              }
              primaryTypographyProps={{ sx: { wordBreak: "break-word" } }}
            />
          </ListItemButton>

          <Tooltip title="Eliminar board">
            <IconButton
              onClick={() => onDeleteBoard(board.id)}
              sx={{ mt: 0.5, flexShrink: 0 }}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}
    </List>
  );
}