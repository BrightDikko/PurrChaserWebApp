package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.domain.Image;
import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ListingService {
    Page<Listing> getAllListings(Pageable pageable);

    Listing createNewListing(CreateListingRequest createListingRequest);

    List<Image> getImagesForListing(Integer listingId);

    Listing getListingById(Integer listingId);
}
