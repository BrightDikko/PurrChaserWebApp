package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {

    Optional<ApplicationUser> findByEmail(String username);

}
