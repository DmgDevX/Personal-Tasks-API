package com.dmgdev.taskmanager.task.controller;

import com.dmgdev.taskmanager.task.dto.CreateTaskRequest;
import com.dmgdev.taskmanager.task.dto.TaskResponse;
import com.dmgdev.taskmanager.task.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
}