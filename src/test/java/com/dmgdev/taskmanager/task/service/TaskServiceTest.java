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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private BoardRepository boardRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private TaskService taskService;

    private User user;
    private Board board;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("diego@test.com");

        board = new Board();
        board.setId(1L);
        board.setName("Trabajo");
        board.setUser(user);
    }

    @Test
    void createTask_deberiaCrearTaskCorrectamente() {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Estudiar");
        request.setDescription("Repasar Spring");
        request.setPriority(TaskPriority.HIGH);
        request.setDueDate(LocalDate.of(2026, 4, 10));
        request.setBoardId(1L);

        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));
        when(boardRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(board));

        Task task = new Task();
        task.setId(1L);
        task.setTitle("Estudiar");
        task.setDescription("Repasar Spring");
        task.setPriority(TaskPriority.HIGH);
        task.setDueDate(LocalDate.of(2026, 4, 10));
        task.setCompleted(false);
        task.setBoard(board);

        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponse response = taskService.createTask(request, authentication);

        assertNotNull(response);
        assertEquals("Estudiar", response.getTitle());
        assertEquals(TaskPriority.HIGH, response.getPriority());
        assertFalse(response.isCompleted());
    }

    @Test
    void completeTask_deberiaMarcarComoCompletada() {
        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Task task = new Task();
        task.setId(1L);
        task.setTitle("Estudiar");
        task.setCompleted(false);
        task.setBoard(board);

        when(taskRepository.findByIdAndBoardUserId(1L, 1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskResponse response = taskService.completeTask(1L, authentication);

        assertTrue(response.isCompleted());
    }

    @Test
    void getMyTasks_deberiaFiltrarPorPrioridad() {
        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Task task = new Task();
        task.setId(1L);
        task.setTitle("Tarea importante");
        task.setPriority(TaskPriority.HIGH);
        task.setCompleted(false);
        task.setBoard(board);

        when(taskRepository.findByBoardUserIdAndPriority(1L, TaskPriority.HIGH))
                .thenReturn(List.of(task));

        List<TaskResponse> tasks = taskService.getMyTasks(
                null,
                TaskPriority.HIGH,
                null,
                authentication
        );

        assertEquals(1, tasks.size());
        assertEquals("Tarea importante", tasks.get(0).getTitle());
    }

    @Test
    void deleteTask_deberiaEliminarTask() {
        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Task task = new Task();
        task.setId(1L);
        task.setBoard(board);

        when(taskRepository.findByIdAndBoardUserId(1L, 1L)).thenReturn(Optional.of(task));

        taskService.deleteTask(1L, authentication);

        verify(taskRepository).delete(task);
    }

    @Test
    void updateTask_deberiaActualizarCampos() {
        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Task task = new Task();
        task.setId(1L);
        task.setTitle("Vieja");
        task.setDescription("Desc vieja");
        task.setPriority(TaskPriority.LOW);
        task.setCompleted(false);
        task.setBoard(board);

        UpdateTaskRequest request = new UpdateTaskRequest();
        request.setTitle("Nueva");
        request.setDescription("Desc nueva");
        request.setPriority(TaskPriority.MEDIUM);
        request.setDueDate(LocalDate.of(2026, 4, 20));
        request.setCompleted(true);

        when(taskRepository.findByIdAndBoardUserId(1L, 1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskResponse response = taskService.updateTask(1L, request, authentication);

        assertEquals("Nueva", response.getTitle());
        assertEquals(TaskPriority.MEDIUM, response.getPriority());
        assertTrue(response.isCompleted());
    }
}