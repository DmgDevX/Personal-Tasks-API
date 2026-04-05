package com.dmgdev.taskmanager.board.integration;

import com.dmgdev.taskmanager.auth.dto.LoginRequest;
import com.dmgdev.taskmanager.auth.dto.RegisterRequest;
import com.dmgdev.taskmanager.board.dto.CreateBoardRequest;
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

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class BoardControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;
    private String token;

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

        JsonNode jsonNode = objectMapper.readTree(loginResponse);
        token = jsonNode.get("token").asText();
    }

    @Test
    void createBoard_deberiaCrearBoard() throws Exception {
        CreateBoardRequest request = new CreateBoardRequest();
        request.setName("Trabajo");
        request.setDescription("Board del trabajo");

        mockMvc.perform(post("/api/boards")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Trabajo"));
    }

    @Test
    void getBoards_deberiaListarBoards() throws Exception {
        CreateBoardRequest request = new CreateBoardRequest();
        request.setName("Trabajo");
        request.setDescription("Board del trabajo");

        mockMvc.perform(post("/api/boards")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

        mockMvc.perform(get("/api/boards")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Trabajo"));
    }

    @Test
    void deleteBoard_deberiaEliminarBoard() throws Exception {
        CreateBoardRequest request = new CreateBoardRequest();
        request.setName("Trabajo");
        request.setDescription("Board del trabajo");

        String response = mockMvc.perform(post("/api/boards")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode boardJson = objectMapper.readTree(response);
        Long boardId = boardJson.get("id").asLong();

        mockMvc.perform(delete("/api/boards/" + boardId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }
}