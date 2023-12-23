package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.PrimaryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrimaryCategoryRepository extends JpaRepository<PrimaryCategory, Integer> {
}
