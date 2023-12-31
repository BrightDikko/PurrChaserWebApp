package com.purrchaser.purrchaserbackend.service.impl;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import com.purrchaser.purrchaserbackend.domain.Image;
import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.domain.TertiaryCategory;
import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import com.purrchaser.purrchaserbackend.exceptions.ApiRequestException;
import com.purrchaser.purrchaserbackend.repository.ImageRepository;
import com.purrchaser.purrchaserbackend.repository.ListingRepository;
import com.purrchaser.purrchaserbackend.repository.TertiaryCategoryRepository;
import com.purrchaser.purrchaserbackend.repository.UserRepository;
import com.purrchaser.purrchaserbackend.service.ListingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final TertiaryCategoryRepository tertiaryCategoryRepository;

    @Override
    public Page<Listing> getAllListings(Pageable pageable) {
        return listingRepository.findAll(pageable);
    }

    @Override
    public Listing getListingById(Integer listingId) {
        return listingRepository.findById(listingId)
                .orElseThrow(() -> new EntityNotFoundException("Listing not found with ID: " + listingId));
    }

    @Override
    public Listing createNewListing(CreateListingRequest request) {
        ApplicationUser seller = userRepository.findById(request.getSellerId())
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));

        Image mainImage = Image.builder()
                .url(request.getMainImageUrl())
                .build();
        mainImage = imageRepository.save(mainImage);

        TertiaryCategory category = tertiaryCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiRequestException(
                        "Category with ID " + request.getCategoryId() + " not found",
                        HttpStatus.NOT_FOUND));

        Listing listing = Listing.builder()
                .seller(seller)
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .isSold(false)
                .itemCondition(request.getItemCondition())
                .brand(request.getBrand())
                .model(request.getModel())
                .mainImage(mainImage)
                .category(category)
                .meetingLocation(request.getMeetingLocation())
                .build();

        Listing newlyCreatedListing = listingRepository.save(listing);

        mainImage.setListing(newlyCreatedListing);
        imageRepository.save(mainImage);

        for (String url : request.getOtherImagesUrls()) {
            Image newImage = Image.builder()
                    .listing(newlyCreatedListing)
                    .url(url)
                    .build();
            imageRepository.save(newImage);
        }

        return newlyCreatedListing;
    }

    @Override
    public List<Image> getImagesForListing(Integer listingId) {
        return imageRepository.findByListing_ListingId(listingId);
    }

}
