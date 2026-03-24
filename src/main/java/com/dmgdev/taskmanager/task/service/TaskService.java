package com.dmgdev.taskmanager.task.service;

import com.dmgdev.taskmanager.board.entity.Board;
import com.dmgdev.taskmanager.board.repository.BoardRepository;
import com.dmgdev.taskmanager.task.dto.CreateTaskRequest;
import com.dmgdev.taskmanager.task.dto.TaskResponse;
import com.dmgdev.taskmanager.task.entity.Task;
import com.dmgdev.taskmanager.user.entity.User;
import com.dmgdev.taskmanager.task.repository.TaskRepository;
import com.dmgdev.taskmanager.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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