package com.dmgdev.taskmanager.board.service;

import com.dmgdev.taskmanager.board.dto.BoardResponse;
import com.dmgdev.taskmanager.board.dto.CreateBoardRequest;
import com.dmgdev.taskmanager.board.entity.Board;
import com.dmgdev.taskmanager.board.repository.BoardRepository;
import com.dmgdev.taskmanager.user.entity.User;
import com.dmgdev.taskmanager.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardService(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    public BoardResponse createBoard(CreateBoardRequest request, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Board board = new Board();
        board.setName(request.getName());
        board.setDescription(request.getDescription());
        board.setUser(currentUser);

        Board savedBoard = boardRepository.save(board);
        return mapToResponse(savedBoard);
    }

    public List<BoardResponse> getMyBoards(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        return boardRepository.findByUserId(currentUser.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado"));
    }

    private BoardResponse mapToResponse(Board board) {
        return new BoardResponse(
                board.getId(),
                board.getName(),
                board.getDescription(),
                board.getCreatedAt()
        );
    }
}