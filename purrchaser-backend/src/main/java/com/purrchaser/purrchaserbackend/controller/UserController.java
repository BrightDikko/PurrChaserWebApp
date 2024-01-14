package com.purrchaser.purrchaserbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.purrchaser.purrchaserbackend.constants.PathConstants.ADMIN_TEST;
import static com.purrchaser.purrchaserbackend.constants.PathConstants.USER_TEST;

@RestController
public class UserController {

    @GetMapping(USER_TEST)
    public String testUserController() {
        return "Test data from testUserController";
    }

    @GetMapping(ADMIN_TEST)
    public String testAdminController() {
        return "Test data from testAdminController";
    }


}
