package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import com.purrchaser.purrchaserbackend.mapper.ListingMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
public class ListingController {
    private final ListingMapper listingMapper;

    @GetMapping("/all")
    public ResponseEntity<Page<ListingDTO>> getAllListings(@PageableDefault(size = 24) Pageable pageable) {
        return ResponseEntity.ok(listingMapper.getAllListings(pageable));
    }

    @PostMapping
    public ResponseEntity<ListingDTO> createListing(@Valid @RequestBody CreateListingRequest createListingRequest) {

        ListingDTO listingDTO = listingMapper.createListing(createListingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(listingDTO);
    }
}
