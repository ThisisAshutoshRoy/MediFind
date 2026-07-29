package com.ashutosh.medicine.config;

import com.ashutosh.medicine.entity.AdminUser;
import com.ashutosh.medicine.repository.AdminUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;

    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;

    }

    @Override
    public void run(String... args) {

        if (adminUserRepository.findByUsername("admin").isEmpty()) {

            AdminUser admin = AdminUser.builder()

                    .username("admin")

                    .password(passwordEncoder.encode("admin123"))

                    .role("ADMIN")

                    .build();

            adminUserRepository.save(admin);

            System.out.println("======================================");
            System.out.println(" Default Admin Created");
            System.out.println(" Username : admin");
            System.out.println(" Password : admin123");
            System.out.println("======================================");

        }

    }

}