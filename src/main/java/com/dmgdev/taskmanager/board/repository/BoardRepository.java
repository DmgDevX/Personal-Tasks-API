package com.dmgdev.taskmanager.board.repository;

import com.dmgdev.taskmanager.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByUserId(Long userId);

    Optional<Board> findByIdAndUserId(Long boardId, Long userId);
}