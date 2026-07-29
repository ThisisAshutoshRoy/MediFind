package com.ashutosh.medicine.repository;

import com.ashutosh.medicine.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminUserRepository
        extends JpaRepository<AdminUser, Long> {

    Optional<AdminUser> findByUsername(String username);

}