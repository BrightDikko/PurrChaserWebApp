package com.purrchaser.purrchaserbackend.mapper;

import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.CategoryDTO;
import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import com.purrchaser.purrchaserbackend.dto.ImageDTO;
import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import com.purrchaser.purrchaserbackend.dto.SellerDTO;
import com.purrchaser.purrchaserbackend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ListingMapper {

    private final ListingService listingService;

    public Page<ListingDTO> getAllListings(Pageable pageable) {
        Page<Listing> listings = listingService.getAllListings(pageable);
        return listings.map(this::convertToListingDTO);
    }

    public ListingDTO createListing(CreateListingRequest createListingRequest) {
        Listing newlyCreatedListing = listingService.createNewListing(createListingRequest);
        return convertToListingDTO(newlyCreatedListing);
    }

    public ListingDTO convertToListingDTO(Listing listing) {
        SellerDTO sellerDTO = SellerDTO.builder()
                .userId(listing.getSeller().getUserId())
                .firstName(listing.getSeller().getFirstName())
                .lastName(listing.getSeller().getLastName())
                .profilePictureUrl(listing.getSeller().getProfilePictureUrl())
                .isVerified(listing.getSeller().getIsVerified())
                .build();

        ImageDTO imageDTO = ImageDTO.builder()
                .imageId(listing.getMainImage().getImageId())
                .listingId(listing.getListingId())
                .url(listing.getMainImage().getUrl())
                .build();

        CategoryDTO categoryDTO = CategoryDTO.builder()
                .tertiaryCategoryId(listing.getListingId())
                .name(listing.getCategory().getName())
                .build();

        return ListingDTO.builder()
                .listingId(listing.getListingId())
                .createdAt(listing.getCreatedAt().toLocalDateTime())
                .updatedAt(listing.getUpdatedAt().toLocalDateTime())
                .seller(sellerDTO)
                .title(listing.getTitle())
                .description(listing.getDescription())
                .price(listing.getPrice())
                .isSold(listing.getIsSold())
                .itemCondition(listing.getItemCondition())
                .brand(listing.getBrand())
                .model(listing.getModel())
                .image(imageDTO)
                .category(categoryDTO)
                .meetingLocation(listing.getMeetingLocation())
                .build();
    }

}