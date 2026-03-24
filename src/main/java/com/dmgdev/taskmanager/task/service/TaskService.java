package com.dmgdev.taskmanager.task.service;

import com.dmgdev.taskmanager.board.entity.Board;
import com.dmgdev.taskmanager.board.repository.BoardRepository;
import com.dmgdev.taskmanager.task.dto.CreateTaskRequest;
import com.dmgdev.taskmanager.task.dto.TaskResponse;
import com.dmgdev.taskmanager.task.dto.UpdateTaskRequest;
import com.dmgdev.taskmanager.task.entity.Task;
import com.dmgdev.taskmanager.task.entity.TaskPriority;
import com.dmgdev.taskmanager.task.repository.TaskRepository;
import com.dmgdev.taskmanager.user.entity.User;
import com.dmgdev.taskmanager.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public TaskService(
            TaskRepository taskRepository,
            BoardRepository boardRepository,
            UserRepository userRepository
    ) {
        this.taskRepository = taskRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse createTask(CreateTaskRequest request, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Board board = boardRepository.findByIdAndUserId(request.getBoardId(), currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Board no encontrado o no pertenece al usuario autenticado"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setCompleted(false);
        task.setBoard(board);

        Task savedTask = taskRepository.save(task);
        return mapToResponse(savedTask);
    }

    public List<TaskResponse> getTasksByBoard(Long boardId, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Board board = boardRepository.findByIdAndUserId(boardId, currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Board no encontrado o no pertenece al usuario autenticado"));

        return taskRepository.findByBoardId(board.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TaskResponse completeTask(Long taskId, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Task task = taskRepository.findByIdAndBoardUserId(taskId, currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Task no encontrada o no pertenece al usuario autenticado"));

        task.setCompleted(true);

        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public TaskResponse updateTask(Long taskId, UpdateTaskRequest request, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Task task = taskRepository.findByIdAndBoardUserId(taskId, currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Task no encontrada o no pertenece al usuario autenticado"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setCompleted(request.getCompleted());

        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public void deleteTask(Long taskId, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Task task = taskRepository.findByIdAndBoardUserId(taskId, currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Task no encontrada o no pertenece al usuario autenticado"));

        taskRepository.delete(task);
    }

    public List<TaskResponse> getMyTasks(
            Boolean completed,
            TaskPriority priority,
            LocalDate dueDate,
            Authentication authentication
    ) {
        User currentUser = getCurrentUser(authentication);

        List<Task> tasks;

        if (completed != null && priority != null && dueDate != null) {
            tasks = taskRepository.findByBoardUserIdAndCompletedAndPriorityAndDueDate(
                    currentUser.getId(), completed, priority, dueDate
            );
        } else if (completed != null && priority != null) {
            tasks = taskRepository.findByBoardUserIdAndCompletedAndPriority(
                    currentUser.getId(), completed, priority
            );
        } else if (completed != null && dueDate != null) {
            tasks = taskRepository.findByBoardUserIdAndCompletedAndDueDate(
                    currentUser.getId(), completed, dueDate
            );
        } else if (priority != null && dueDate != null) {
            tasks = taskRepository.findByBoardUserIdAndPriorityAndDueDate(
                    currentUser.getId(), priority, dueDate
            );
        } else if (completed != null) {
            tasks = taskRepository.findByBoardUserIdAndCompleted(
                    currentUser.getId(), completed
            );
        } else if (priority != null) {
            tasks = taskRepository.findByBoardUserIdAndPriority(
                    currentUser.getId(), priority
            );
        } else if (dueDate != null) {
            tasks = taskRepository.findByBoardUserIdAndDueDate(
                    currentUser.getId(), dueDate
            );
        } else {
            tasks = taskRepository.findByBoardUserId(currentUser.getId());
        }

        return tasks.stream()
                .map(this::mapToResponse)
                .toList();
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado"));
    }

    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getPriority(),
                task.getDueDate(),
                task.getCreatedAt(),
                task.getBoard().getId()
        );
    }
}