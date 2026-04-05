package com.dmgdev.taskmanager.auth.service;

import com.dmgdev.taskmanager.auth.dto.AuthResponse;
import com.dmgdev.taskmanager.auth.dto.LoginRequest;
import com.dmgdev.taskmanager.auth.dto.RegisterRequest;
import com.dmgdev.taskmanager.security.jwt.JwtService;
import com.dmgdev.taskmanager.user.entity.User;
import com.dmgdev.taskmanager.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setUsername("diego");
        registerRequest.setEmail("diego@test.com");
        registerRequest.setPassword("123456");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("diego@test.com");
        loginRequest.setPassword("123456");
    }

    @Test
    void register_deberiaCrearUsuarioYDevolverToken() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(registerRequest.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("password-cifrada");
        when(jwtService.generateToken(any())).thenReturn("token-falso");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setUsername("diego");
        savedUser.setEmail("diego@test.com");
        savedUser.setPassword("password-cifrada");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("token-falso", response.getToken());

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User userGuardado = userCaptor.getValue();
        assertEquals("diego", userGuardado.getUsername());
        assertEquals("diego@test.com", userGuardado.getEmail());
        assertEquals("password-cifrada", userGuardado.getPassword());
    }

    @Test
    void register_deberiaLanzarErrorSiEmailYaExiste() {
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authService.register(registerRequest)
        );

        assertEquals("El email ya está registrado", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_deberiaAutenticarYDevolverToken() {
        User user = new User();
        user.setId(1L);
        user.setUsername("diego");
        user.setEmail("diego@test.com");
        user.setPassword("password-cifrada");

        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any())).thenReturn("token-login");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("token-login", response.getToken());

        verify(authenticationManager).authenticate(
                any(UsernamePasswordAuthenticationToken.class)
        );
    }

    @Test
    void login_deberiaLanzarErrorSiUsuarioNoExiste() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authService.login(loginRequest)
        );

        assertEquals("Credenciales inválidas", exception.getMessage());
    }
}