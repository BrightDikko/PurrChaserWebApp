package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.PrimaryCategoryDTO;
import com.purrchaser.purrchaserbackend.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.purrchaser.purrchaserbackend.constants.PathConstants.CATEGORIES;

@RestController
@RequestMapping(CATEGORIES)
@RequiredArgsConstructor
public class CategoriesController {
    private final CategoryMapper categoryMapper;
    @GetMapping
    public ResponseEntity<List<PrimaryCategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryMapper.getAllCategories());
    }
}
