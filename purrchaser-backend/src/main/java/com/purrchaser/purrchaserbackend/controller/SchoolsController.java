package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.SchoolDTO;
import com.purrchaser.purrchaserbackend.mapper.SchoolMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
public class SchoolsController {
    private final SchoolMapper schoolMapper;
    @GetMapping
    public ResponseEntity<List<SchoolDTO>> getAllSchools() {
        System.out.println("Request received to get all schools");
        return ResponseEntity.ok(schoolMapper.getAllSchools());
    }
}
