package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import com.purrchaser.purrchaserbackend.mapper.ListingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
public class ListingController {
    private final ListingMapper listingMapper;

    @GetMapping("/all")
    public ResponseEntity<Page<ListingDTO>> getAllListings(@PageableDefault(size = 5) Pageable pageable) {
        return ResponseEntity.ok(listingMapper.getAllListings(pageable));
    }
}
