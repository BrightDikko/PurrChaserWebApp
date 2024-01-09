package com.purrchaser.purrchaserbackend.repository;

import com.purrchaser.purrchaserbackend.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {

    List<Cart> findByUser_UserId(Integer userId);

    Optional<Cart> findByUser_UserIdAndListing_ListingId(Integer userId, Integer listingId);
}
