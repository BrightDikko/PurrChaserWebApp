package com.purrchaser.purrchaserbackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user/test")
    public String testUserController() {
        return "Test data from testUserController";
    }

    @GetMapping("/admin/test")
    public String testAdminController() {
        return "Test data from testAdminController";
    }


}
