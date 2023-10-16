package com.purrchaser.purrchaserbackend.services;

import com.purrchaser.purrchaserbackend.exceptions.EmailAlreadyTakenException;
import com.purrchaser.purrchaserbackend.exceptions.UserDoesNotExistException;
import com.purrchaser.purrchaserbackend.models.ApplicationUser;
import com.purrchaser.purrchaserbackend.models.RegistrationObject;
import com.purrchaser.purrchaserbackend.models.Role;
import com.purrchaser.purrchaserbackend.repositories.RoleRepository;
import com.purrchaser.purrchaserbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
//@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public ApplicationUser getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    public ApplicationUser updateUser(ApplicationUser user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public ApplicationUser registerUser(RegistrationObject registrationRequest) {

        ApplicationUser user = ApplicationUser.builder()
                .firstName(registrationRequest.getFirstName())
                .lastName(registrationRequest.getLastName())
                .email(registrationRequest.getEmail())
                .dateOfBirth(registrationRequest.getDob())
                .build();

        String name = user.getFirstName() + user.getLastName();

        boolean isNameUnavailable = true;

        String tempName = "";
        while(isNameUnavailable) {
            tempName = generateUsername(name);

            if (userRepository.findByUsername(tempName).isEmpty()) {
                isNameUnavailable = false;
            }
        }
        user.setUsername(tempName);

        Set<Role> roles = user.getAuthorities();
        if(roles == null) {
            roles = new HashSet<>();
        }
        roles.add(roleRepository.findByAuthority("USER").get());
        user.setAuthorities(roles);

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }

    }

    private String generateUsername(String name) {
        long generatedNumber = (long) Math.floor(Math.random() * 1_000_000_000);
        return name + generatedNumber;
    }

}
