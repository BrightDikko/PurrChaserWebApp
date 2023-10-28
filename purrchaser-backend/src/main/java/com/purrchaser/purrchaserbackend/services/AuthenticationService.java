package com.purrchaser.purrchaserbackend.services;

import com.purrchaser.purrchaserbackend.exceptions.EmailAlreadyTakenException;
import com.purrchaser.purrchaserbackend.exceptions.UserDoesNotExistException;
import com.purrchaser.purrchaserbackend.models.ApplicationUser;
import com.purrchaser.purrchaserbackend.models.LoginRequest;
import com.purrchaser.purrchaserbackend.models.LoginResponse;
import com.purrchaser.purrchaserbackend.models.RegistrationRequest;
import com.purrchaser.purrchaserbackend.models.Role;
import com.purrchaser.purrchaserbackend.repositories.RoleRepository;
import com.purrchaser.purrchaserbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public ApplicationUser registerUser(RegistrationRequest registrationRequest) {

        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());

        ApplicationUser user = ApplicationUser.builder()
                .fullName(registrationRequest.getFullName())
                .schoolName(registrationRequest.getSchoolName())
                .email(registrationRequest.getEmail())
                .password(encodedPassword)
                .build();

        Set<Role> roles = new HashSet<>();
        if (user.getAuthorities() != null) {
            for (GrantedAuthority authority : user.getAuthorities()) {
                roles.add((Role) authority);
            }
        }

        Optional<Role> userRoleOptional = roleRepository.findByAuthority("USER");
        if (userRoleOptional.isPresent()) {
            roles.add(userRoleOptional.get());
        } else {
            throw new IllegalStateException("Required 'USER' role not found in the database.");
        }

        user.setAuthorities(roles);

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }

    }

    public LoginResponse loginUser(LoginRequest loginRequest) {

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            String JWToken = tokenService.generateJwt(auth);

            Optional<ApplicationUser> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            if (userOptional.isPresent()) {
                return LoginResponse.builder()
                        .user(userOptional.get())
                        .token(JWToken)
                        .build();
            } else {
                throw new UserDoesNotExistException();
            }
        } catch (AuthenticationException e) {
            return new LoginResponse(null, "");
        }
    }

}
