package com.purrchaser.purrchaserbackend;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import com.purrchaser.purrchaserbackend.domain.Role;
import com.purrchaser.purrchaserbackend.repository.RoleRepository;
import com.purrchaser.purrchaserbackend.repository.UserRepository;
import com.purrchaser.purrchaserbackend.s3.S3Buckets;
import com.purrchaser.purrchaserbackend.s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;

@SpringBootApplication
public class PurrChaserBackendServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PurrChaserBackendServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository,
                          UserRepository userRepository,
                          S3Service s3Service,
                          S3Buckets s3Buckets) {
        return args -> {
            createAdminUserIfNeeded("devbydikko@gmail.com", "password", roleRepository, userRepository);
        };
    }

    public void createAdminUserIfNeeded(String email, String password, RoleRepository roleRepository, UserRepository userRepository) {
        if (userRepository.findByEmail(email).isEmpty()) {
            Role adminRole = roleRepository.findByAuthority("ADMIN").orElseThrow(
                    () -> new RuntimeException("Admin role not found")
            );

            ApplicationUser adminUser = ApplicationUser.builder()
                    .email(email)
                    .firstName("Admin")
                    .password(new BCryptPasswordEncoder().encode(password))
                    .authorities(Collections.singleton(adminRole))
                    .build();

            userRepository.save(adminUser);
        }
    }

}
