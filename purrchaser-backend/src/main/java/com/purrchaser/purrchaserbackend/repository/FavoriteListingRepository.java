package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.FavoriteListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteListingRepository extends JpaRepository<FavoriteListing, Integer> {
    List<FavoriteListing> findByUser_UserId(Integer userId);

    Optional<FavoriteListing> findByUser_UserIdAndListing_ListingId(Integer userId, Integer listingId);
}
