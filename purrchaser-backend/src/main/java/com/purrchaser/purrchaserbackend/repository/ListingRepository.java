package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Integer> {

}

