package com.dmgdev.taskmanager.user.mapper;

import com.dmgdev.taskmanager.user.dto.UserResponse;
import com.dmgdev.taskmanager.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}