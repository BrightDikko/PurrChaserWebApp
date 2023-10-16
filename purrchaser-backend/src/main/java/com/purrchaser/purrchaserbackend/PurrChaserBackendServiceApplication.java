package com.purrchaser.purrchaserbackend;

import com.purrchaser.purrchaserbackend.models.Role;
import com.purrchaser.purrchaserbackend.repositories.RoleRepository;
import com.purrchaser.purrchaserbackend.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PurrChaserBackendServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PurrChaserBackendServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserService userService) {
		return args -> {
			roleRepository.save(Role.builder()
					.roleId(1)
					.authority("USER")
					.build());
		};
	}
}
