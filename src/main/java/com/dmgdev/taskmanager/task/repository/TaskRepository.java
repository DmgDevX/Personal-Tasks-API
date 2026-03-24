package com.dmgdev.taskmanager.task.repository;

import com.dmgdev.taskmanager.task.entity.Task;
import com.dmgdev.taskmanager.task.entity.TaskPriority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByBoardId(Long boardId);

    Optional<Task> findByIdAndBoardUserId(Long taskId, Long userId);

    List<Task> findByBoardUserId(Long userId);

    List<Task> findByBoardUserIdAndCompleted(Long userId, boolean completed);

    List<Task> findByBoardUserIdAndPriority(Long userId, TaskPriority priority);

    List<Task> findByBoardUserIdAndDueDate(Long userId, LocalDate dueDate);

    List<Task> findByBoardUserIdAndCompletedAndPriority(Long userId, boolean completed, TaskPriority priority);

    List<Task> findByBoardUserIdAndCompletedAndDueDate(Long userId, boolean completed, LocalDate dueDate);

    List<Task> findByBoardUserIdAndPriorityAndDueDate(Long userId, TaskPriority priority, LocalDate dueDate);

    List<Task> findByBoardUserIdAndCompletedAndPriorityAndDueDate(
            Long userId,
            boolean completed,
            TaskPriority priority,
            LocalDate dueDate
    );
}