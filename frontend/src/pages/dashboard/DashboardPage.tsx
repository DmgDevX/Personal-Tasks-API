import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import { useSnackbar } from "notistack";
import type { AxiosError } from "axios";
import AppShell from "../../components/common/AppShell";
import FuturisticCard from "../../components/common/FuturisticCard";
import BoardList from "../../components/boards/BoardList";
import CreateBoardDialog from "../../components/boards/CreateBoardDialog";
import TaskFilters from "../../components/tasks/TaskFilters";
import TaskList from "../../components/tasks/TaskList";
import CreateTaskDialog from "../../components/tasks/CreateTaskDialog";
import EditTaskDialog from "../../components/tasks/EditTaskDialog";
import { useAuth } from "../../hooks/useAuth";
import { createBoard, deleteBoard, getBoards } from "../../api/boardsApi";
import {
  completeTask,
  createTask,
  deleteTask,
  getMyTasks,
  getTasksByBoard,
  updateTask,
} from "../../api/taskApi";
import type { Board } from "../../types/board";
import type { Task, TaskFiltersState, TaskPriority } from "../../types/task";
import type { ApiErrorResponse } from "../../types/api";

const initialFilters: TaskFiltersState = {
  completed: "all",
  priority: "all",
  dueDate: "",
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [filters, setFilters] = useState<TaskFiltersState>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createBoardOpen, setCreateBoardOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getErrorMessage = (err: unknown, fallback: string) => {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      fallback
    );
  };

  const loadBoards = async () => {
    const data = await getBoards();
    setBoards(data);
  };

  const loadTasks = async () => {
    if (selectedBoardId !== null) {
      const data = await getTasksByBoard(selectedBoardId);
      setTasks(data);
      return;
    }

    const params: {
      completed?: boolean;
      priority?: TaskPriority;
      dueDate?: string;
    } = {};

    if (filters.completed !== "all") {
      params.completed = filters.completed === "true";
    }

    if (filters.priority !== "all") {
      params.priority = filters.priority;
    }

    if (filters.dueDate) {
      params.dueDate = filters.dueDate;
    }

    const data = await getMyTasks(params);
    setTasks(data);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        await loadBoards();
        await loadTasks();
      } catch (err: unknown) {
        setError(getErrorMessage(err, "No se pudieron cargar los datos"));
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [selectedBoardId, filters.completed, filters.priority, filters.dueDate]);

  const handleCreateBoard = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      await createBoard(data);
      enqueueSnackbar("Board creado correctamente", { variant: "success" });
      await loadBoards();
    } catch (err: unknown) {
      enqueueSnackbar(getErrorMessage(err, "No se pudo crear el board"), {
        variant: "error",
      });
      throw err;
    }
  };

  const handleDeleteBoard = async (boardId: number) => {
    try {
      await deleteBoard(boardId);

      if (selectedBoardId === boardId) {
        setSelectedBoardId(null);
      }

      enqueueSnackbar("Board eliminado correctamente", { variant: "success" });

      await loadBoards();
      await loadTasks();
    } catch (err: unknown) {
      enqueueSnackbar(getErrorMessage(err, "No se pudo eliminar el board"), {
        variant: "error",
      });
    }
  };

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string | null;
    boardId: number;
  }) => {
    try {
      await createTask(data);
      enqueueSnackbar("Tarea creada correctamente", { variant: "success" });
      await loadTasks();
    } catch (err: unknown) {
      enqueueSnackbar(getErrorMessage(err, "No se pudo crear la tarea"), {
        variant: "error",
      });
      throw err;
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      await completeTask(taskId);
      enqueueSnackbar("Tarea completada", { variant: "success" });
      await loadTasks();
    } catch (err: unknown) {
      enqueueSnackbar(getErrorMessage(err, "No se pudo completar la tarea"), {
        variant: "error",
      });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      enqueueSnackbar("Tarea eliminada", { variant: "success" });
      await loadTasks();
    } catch (err: unknown) {
      enqueueSnackbar(getErrorMessage(err, "No se pudo eliminar la tarea"), {
        variant: "error",
      });
    }
  };

  const handleEditTask = async (
    taskId: number,
    data: {
      title: string;
      description: string;
      priority: TaskPriority;
      dueDate: string | null;
      completed: boolean;
    }
  ) => {
    try {
      await updateTask(taskId, data);
      enqueueSnackbar("Tarea actualizada", { variant: "success" });
      await loadTasks();
    } catch (err: unknown) {
      enqueueSnackbar(getErrorMessage(err, "No se pudo actualizar la tarea"), {
        variant: "error",
      });
      throw err;
    }
  };

  const summary = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.filter((task) => !task.completed).length;

    return {
      total: tasks.length,
      completed,
      pending,
    };
  }, [tasks]);

  if (!user) {
    return null;
  }

  return (
    <AppShell
      user={user}
      onLogout={() => {
        logout();
        window.location.href = "/login";
      }}
    >
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "300px minmax(0, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            alignItems: "start",
          }}
        >
          <FuturisticCard sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Stack spacing={2.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1.5}
              >
                <Typography variant="h6">Boards</Typography>

                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => setCreateBoardOpen(true)}
                  sx={{
                    minWidth: { xs: "auto", sm: 100 },
                    whiteSpace: "nowrap",
                  }}
                >
                  Crear
                </Button>
              </Stack>

              <BoardList
                boards={boards}
                selectedBoardId={selectedBoardId}
                onSelectBoard={setSelectedBoardId}
                onDeleteBoard={handleDeleteBoard}
              />
            </Stack>
          </FuturisticCard>

          <Stack spacing={{ xs: 2, md: 3 }} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  xl: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              <FuturisticCard sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <DashboardCustomizeRoundedIcon color="primary" />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" color="text.secondary">
                      Boards
                    </Typography>
                    <Typography variant="h5">{boards.length}</Typography>
                  </Box>
                </Stack>
              </FuturisticCard>

              <FuturisticCard sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <AssignmentTurnedInRoundedIcon color="secondary" />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tareas totales
                    </Typography>
                    <Typography variant="h5">{summary.total}</Typography>
                  </Box>
                </Stack>
              </FuturisticCard>

              <FuturisticCard
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  gridColumn: { xs: "auto", sm: "1 / -1", xl: "auto" },
                }}
              >
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label={`Pendientes: ${summary.pending}`} color="warning" />
                  <Chip
                    label={`Completadas: ${summary.completed}`}
                    color="success"
                  />
                </Stack>
              </FuturisticCard>
            </Box>

            <FuturisticCard sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Stack spacing={2.5}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "stretch", md: "center" }}
                  spacing={2}
                >
                  <Box sx={{ minWidth: 0, textAlign: "left" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        wordBreak: "break-word",
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      {selectedBoardId === null
                        ? "Todas tus tareas"
                        : boards.find((board) => board.id === selectedBoardId)
                            ?.name || "Board"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Gestiona prioridades, fechas y estado de tus tareas.
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => setCreateTaskOpen(true)}
                    disabled={!boards.length}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  >
                    Nueva tarea
                  </Button>
                </Stack>

                {selectedBoardId === null && (
                  <TaskFilters filters={filters} onChange={setFilters} />
                )}

                {loading ? (
                  <Stack alignItems="center" py={6}>
                    <CircularProgress />
                  </Stack>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <TaskList
                    tasks={tasks}
                    onComplete={handleCompleteTask}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setEditTaskOpen(true);
                    }}
                    onDelete={handleDeleteTask}
                  />
                )}
              </Stack>
            </FuturisticCard>
          </Stack>
        </Box>
      </Stack>

      <CreateBoardDialog
        open={createBoardOpen}
        onClose={() => setCreateBoardOpen(false)}
        onSubmit={handleCreateBoard}
      />

      <CreateTaskDialog
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSubmit={handleCreateTask}
      />

      <EditTaskDialog
        open={editTaskOpen}
        onClose={() => {
          setEditTaskOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSubmit={handleEditTask}
      />
    </AppShell>
  );
}