package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends JpaRepository<School, Integer> {
}
