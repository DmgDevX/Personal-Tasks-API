package com.dmgdev.taskmanager.board.service;

import com.dmgdev.taskmanager.board.dto.BoardResponse;
import com.dmgdev.taskmanager.board.dto.CreateBoardRequest;
import com.dmgdev.taskmanager.board.entity.Board;
import com.dmgdev.taskmanager.board.repository.BoardRepository;
import com.dmgdev.taskmanager.user.entity.User;
import com.dmgdev.taskmanager.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoardServiceTest {

    @Mock
    private BoardRepository boardRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private BoardService boardService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("diego");
        user.setEmail("diego@test.com");
    }

    @Test
    void createBoard_deberiaCrearBoardCorrectamente() {
        CreateBoardRequest request = new CreateBoardRequest();
        request.setName("Trabajo");
        request.setDescription("Tareas del trabajo");

        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Board board = new Board();
        board.setId(1L);
        board.setName("Trabajo");
        board.setDescription("Tareas del trabajo");
        board.setUser(user);

        when(boardRepository.save(any(Board.class))).thenReturn(board);

        BoardResponse response = boardService.createBoard(request, authentication);

        assertNotNull(response);
        assertEquals("Trabajo", response.getName());
        assertEquals("Tareas del trabajo", response.getDescription());
    }

    @Test
    void getMyBoards_deberiaDevolverListaDeBoards() {
        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Board board1 = new Board();
        board1.setId(1L);
        board1.setName("Trabajo");
        board1.setDescription("Board 1");
        board1.setUser(user);

        Board board2 = new Board();
        board2.setId(2L);
        board2.setName("Casa");
        board2.setDescription("Board 2");
        board2.setUser(user);

        when(boardRepository.findByUserId(1L)).thenReturn(List.of(board1, board2));

        List<BoardResponse> boards = boardService.getMyBoards(authentication);

        assertEquals(2, boards.size());
        assertEquals("Trabajo", boards.get(0).getName());
        assertEquals("Casa", boards.get(1).getName());
    }

    @Test
    void deleteBoard_deberiaEliminarBoardSiPerteneceAlUsuario() {
        when(authentication.getName()).thenReturn("diego@test.com");
        when(userRepository.findByEmail("diego@test.com")).thenReturn(Optional.of(user));

        Board board = new Board();
        board.setId(1L);
        board.setName("Trabajo");
        board.setUser(user);

        when(boardRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(board));

        boardService.deleteBoard(1L, authentication);

        verify(boardRepository).delete(board);
    }
}