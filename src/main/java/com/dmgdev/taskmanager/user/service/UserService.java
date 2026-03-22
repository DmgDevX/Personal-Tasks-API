package com.dmgdev.taskmanager.user.service;

import com.dmgdev.taskmanager.user.dto.UserResponse;
import com.dmgdev.taskmanager.user.entity.User;
import com.dmgdev.taskmanager.user.mapper.UserMapper;
import com.dmgdev.taskmanager.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        return userMapper.toResponse(user);
    }
}