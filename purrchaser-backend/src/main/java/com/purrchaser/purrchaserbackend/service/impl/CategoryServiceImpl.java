package com.purrchaser.purrchaserbackend.service.impl;

import com.purrchaser.purrchaserbackend.domain.PrimaryCategory;
import com.purrchaser.purrchaserbackend.repository.PrimaryCategoryRepository;
import com.purrchaser.purrchaserbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final PrimaryCategoryRepository primaryCategoryRepository;

    public List<PrimaryCategory> getAllCategories() {
        return primaryCategoryRepository.findAll();
    }
}
