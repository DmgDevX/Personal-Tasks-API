package com.dmgdev.taskmanager.task.integration;

import com.dmgdev.taskmanager.auth.dto.LoginRequest;
import com.dmgdev.taskmanager.auth.dto.RegisterRequest;
import com.dmgdev.taskmanager.board.dto.CreateBoardRequest;
import com.dmgdev.taskmanager.task.dto.CreateTaskRequest;
import com.dmgdev.taskmanager.task.dto.UpdateTaskRequest;
import com.dmgdev.taskmanager.task.entity.TaskPriority;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class TaskControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;
    private String token;
    private Long boardId;

    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @BeforeEach
    void setUp() throws Exception {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();

        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setUsername("diego");
        registerRequest.setEmail("diego@test.com");
        registerRequest.setPassword("123456");

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)));

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("diego@test.com");
        loginRequest.setPassword("123456");

        String loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode loginJson = objectMapper.readTree(loginResponse);
        token = loginJson.get("token").asText();

        CreateBoardRequest boardRequest = new CreateBoardRequest();
        boardRequest.setName("Trabajo");
        boardRequest.setDescription("Board para tareas");

        String boardResponse = mockMvc.perform(post("/api/boards")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(boardRequest)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode boardJson = objectMapper.readTree(boardResponse);
        boardId = boardJson.get("id").asLong();
    }

    @Test
    void createTask_deberiaCrearTask() throws Exception {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Estudiar");
        request.setDescription("Repasar tests");
        request.setPriority(TaskPriority.HIGH);
        request.setDueDate(LocalDate.of(2026, 4, 10));
        request.setBoardId(boardId);

        mockMvc.perform(post("/api/tasks")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Estudiar"))
                .andExpect(jsonPath("$.priority").value("HIGH"));
    }

    @Test
    void getTasks_deberiaListarTasks() throws Exception {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Estudiar");
        request.setDescription("Repasar tests");
        request.setPriority(TaskPriority.HIGH);
        request.setDueDate(LocalDate.of(2026, 4, 10));
        request.setBoardId(boardId);

        mockMvc.perform(post("/api/tasks")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Estudiar"));
    }

    @Test
    void completeTask_deberiaMarcarTaskComoCompletada() throws Exception {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Estudiar");
        request.setDescription("Repasar tests");
        request.setPriority(TaskPriority.HIGH);
        request.setDueDate(LocalDate.of(2026, 4, 10));
        request.setBoardId(boardId);

        String taskResponse = mockMvc.perform(post("/api/tasks")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode taskJson = objectMapper.readTree(taskResponse);
        Long taskId = taskJson.get("id").asLong();

        mockMvc.perform(patch("/api/tasks/" + taskId + "/complete")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void updateTask_deberiaActualizarTask() throws Exception {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Estudiar");
        request.setDescription("Repasar tests");
        request.setPriority(TaskPriority.HIGH);
        request.setDueDate(LocalDate.of(2026, 4, 10));
        request.setBoardId(boardId);

        String taskResponse = mockMvc.perform(post("/api/tasks")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode taskJson = objectMapper.readTree(taskResponse);
        Long taskId = taskJson.get("id").asLong();

        UpdateTaskRequest updateRequest = new UpdateTaskRequest();
        updateRequest.setTitle("Estudiar Spring");
        updateRequest.setDescription("Repasar tests y seguridad");
        updateRequest.setPriority(TaskPriority.MEDIUM);
        updateRequest.setDueDate(LocalDate.of(2026, 4, 12));
        updateRequest.setCompleted(false);

        mockMvc.perform(put("/api/tasks/" + taskId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Estudiar Spring"))
                .andExpect(jsonPath("$.priority").value("MEDIUM"));
    }

    @Test
    void deleteTask_deberiaEliminarTask() throws Exception {
        CreateTaskRequest request = new CreateTaskRequest();
        request.setTitle("Estudiar");
        request.setDescription("Repasar tests");
        request.setPriority(TaskPriority.HIGH);
        request.setDueDate(LocalDate.of(2026, 4, 10));
        request.setBoardId(boardId);

        String taskResponse = mockMvc.perform(post("/api/tasks")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode taskJson = objectMapper.readTree(taskResponse);
        Long taskId = taskJson.get("id").asLong();

        mockMvc.perform(delete("/api/tasks/" + taskId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }
}