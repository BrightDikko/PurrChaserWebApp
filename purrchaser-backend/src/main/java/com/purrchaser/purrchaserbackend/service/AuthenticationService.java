package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import com.purrchaser.purrchaserbackend.dto.LoginRequest;
import com.purrchaser.purrchaserbackend.dto.LoginResponse;
import com.purrchaser.purrchaserbackend.dto.RegistrationRequest;

public interface AuthenticationService {
    ApplicationUser registerUser(RegistrationRequest registrationRequest);
    LoginResponse loginUser(LoginRequest loginRequest);
}
