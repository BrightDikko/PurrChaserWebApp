package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.TertiaryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TertiaryCategoryRepository extends JpaRepository<TertiaryCategory, Integer> {
}
