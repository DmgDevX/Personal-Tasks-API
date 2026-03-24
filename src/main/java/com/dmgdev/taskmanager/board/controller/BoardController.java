package com.dmgdev.taskmanager.board.controller;

import com.dmgdev.taskmanager.board.dto.BoardResponse;
import com.dmgdev.taskmanager.board.dto.CreateBoardRequest;
import com.dmgdev.taskmanager.board.service.BoardService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BoardResponse createBoard(
            @Valid @RequestBody CreateBoardRequest request,
            Authentication authentication
    ) {
        return boardService.createBoard(request, authentication);
    }

    @GetMapping
    public List<BoardResponse> getMyBoards(Authentication authentication) {
        return boardService.getMyBoards(authentication);
    }
}