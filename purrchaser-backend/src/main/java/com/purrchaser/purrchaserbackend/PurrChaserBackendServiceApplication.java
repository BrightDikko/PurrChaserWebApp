package com.purrchaser.purrchaserbackend;

import com.purrchaser.purrchaserbackend.models.ApplicationUser;
import com.purrchaser.purrchaserbackend.models.Role;
import com.purrchaser.purrchaserbackend.repositories.RoleRepository;
import com.purrchaser.purrchaserbackend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class PurrChaserBackendServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PurrChaserBackendServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository) {
		return args -> {


			if (roleRepository.findByAuthority("ADMIN").isEmpty()) {
				Role adminRole = roleRepository.save(Role.builder()
								.roleId(1)
								.authority("ADMIN")
								.build());

				Set<Role> roles = new HashSet<>();
				roles.add(adminRole);

				ApplicationUser admin = ApplicationUser.builder()
						.userId(1)
						.email("devbydikko@gmail.com")
						.fullName("admin")
						.password(new BCryptPasswordEncoder().encode("password"))
						.authorities(roles)
						.build();

				userRepository.save(admin);
			}

			roleRepository.save(Role.builder()
					.roleId(2)
					.authority("USER")
					.build());
		};
	}

}
