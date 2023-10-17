package com.purrchaser.purrchaserbackend.services;

import com.purrchaser.purrchaserbackend.exceptions.EmailAlreadyTakenException;
import com.purrchaser.purrchaserbackend.exceptions.UserDoesNotExistException;
import com.purrchaser.purrchaserbackend.models.ApplicationUser;
import com.purrchaser.purrchaserbackend.models.RegistrationRequest;
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

    public ApplicationUser registerUser(RegistrationRequest registrationRequest) {

        ApplicationUser user = ApplicationUser.builder()
                .fullName(registrationRequest.getFullName())
                .schoolName(registrationRequest.getSchoolName())
                .email(registrationRequest.getEmail())
                .build();

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

}
