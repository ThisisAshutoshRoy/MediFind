package com.ashutosh.medicine.service;

import com.ashutosh.medicine.dto.auth.LoginRequest;
import com.ashutosh.medicine.dto.auth.LoginResponse;
import com.ashutosh.medicine.entity.AdminUser;
import com.ashutosh.medicine.repository.AdminUserRepository;
import com.ashutosh.medicine.security.jwt.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminUserRepository adminUserRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public AuthService(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {

        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;

    }

    public LoginResponse login(LoginRequest request) {

        AdminUser admin = adminUserRepository

                .findByUsername(request.getUsername())

                .orElseThrow(() ->
                        new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword())) {

            throw new RuntimeException("Invalid username or password");

        }

        String token = jwtUtil.generateToken(admin.getUsername());

        return LoginResponse.builder()

                .token(token)

                .username(admin.getUsername())

                .role(admin.getRole())

                .build();

    }

}