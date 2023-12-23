package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.domain.PrimaryCategory;

import java.util.List;

public interface CategoryService {
    List<PrimaryCategory> getAllCategories();
}
