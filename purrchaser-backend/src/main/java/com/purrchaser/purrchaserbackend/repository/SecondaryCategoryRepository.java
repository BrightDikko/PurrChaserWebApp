package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.SecondaryCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecondaryCategoryRepository extends JpaRepository<SecondaryCategory, Integer> {
}
