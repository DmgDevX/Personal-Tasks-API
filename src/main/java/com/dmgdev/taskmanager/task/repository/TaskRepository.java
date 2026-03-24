package com.dmgdev.taskmanager.task.repository;

import com.dmgdev.taskmanager.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByBoardId(Long boardId);
}