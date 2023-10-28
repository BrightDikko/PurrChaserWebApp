package com.purrchaser.purrchaserbackend.controllers;

import com.purrchaser.purrchaserbackend.exceptions.EmailAlreadyTakenException;
import com.purrchaser.purrchaserbackend.exceptions.UserDoesNotExistException;
import com.purrchaser.purrchaserbackend.models.ApplicationUser;
import com.purrchaser.purrchaserbackend.models.LoginRequest;
import com.purrchaser.purrchaserbackend.models.LoginResponse;
import com.purrchaser.purrchaserbackend.models.RegistrationRequest;
import com.purrchaser.purrchaserbackend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailAlreadyTaken() {
        return new ResponseEntity<String>("The email you provided is already in use", HttpStatus.CONFLICT);
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesNotExist() {
        return new ResponseEntity<String>("The user you are looking for does not exist", HttpStatus.NOT_FOUND);
    }


    // go to http://localhost:8000/auth/register
    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationRequest registrationRequest) {
        System.out.println("Request to register user received. \nRequest: " + registrationRequest);
        return authenticationService.registerUser(registrationRequest);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("Request to log in user received. \nRequest: " + loginRequest);
        return authenticationService.loginUser(loginRequest);
    }

}
