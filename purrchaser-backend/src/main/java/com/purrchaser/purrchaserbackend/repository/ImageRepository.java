package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.Image;
import com.purrchaser.purrchaserbackend.domain.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByListing_ListingId(Integer listingId);
}
