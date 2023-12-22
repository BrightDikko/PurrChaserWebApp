package com.purrchaser.purrchaserbackend.service.impl;

import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.repository.ListingRepository;
import com.purrchaser.purrchaserbackend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;

    public Page<Listing> getAllListings(Pageable pageable) {
        return listingRepository.findAll(pageable);
    }

}
