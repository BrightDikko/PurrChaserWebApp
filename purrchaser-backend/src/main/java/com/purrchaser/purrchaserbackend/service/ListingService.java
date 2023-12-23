package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ListingService {
    Page<Listing> getAllListings(Pageable pageable);

    Listing createNewListing(CreateListingRequest createListingRequest);
}
