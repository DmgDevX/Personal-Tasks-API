package com.dmgdev.taskmanager.task.controller;

import com.dmgdev.taskmanager.task.dto.CreateTaskRequest;
import com.dmgdev.taskmanager.task.dto.TaskResponse;
import com.dmgdev.taskmanager.task.dto.UpdateTaskRequest;
import com.dmgdev.taskmanager.task.entity.TaskPriority;
import com.dmgdev.taskmanager.task.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse createTask(
            @Valid @RequestBody CreateTaskRequest request,
            Authentication authentication
    ) {
        return taskService.createTask(request, authentication);
    }

    @GetMapping("/board/{boardId}")
    public List<TaskResponse> getTasksByBoard(
            @PathVariable Long boardId,
            Authentication authentication
    ) {
        return taskService.getTasksByBoard(boardId, authentication);
    }

    @PatchMapping("/{taskId}/complete")
    public TaskResponse completeTask(
            @PathVariable Long taskId,
            Authentication authentication
    ) {
        return taskService.completeTask(taskId, authentication);
    }

    @PutMapping("/{taskId}")
    public TaskResponse updateTask(
            @PathVariable Long taskId,
            @Valid @RequestBody UpdateTaskRequest request,
            Authentication authentication
    ) {
        return taskService.updateTask(taskId, request, authentication);
    }

    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(
            @PathVariable Long taskId,
            Authentication authentication
    ) {
        taskService.deleteTask(taskId, authentication);
    }

    @GetMapping
    public List<TaskResponse> getMyTasks(
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) TaskPriority priority,
            @RequestParam(required = false) LocalDate dueDate,
            Authentication authentication
    ) {
        return taskService.getMyTasks(completed, priority, dueDate, authentication);
    }
}