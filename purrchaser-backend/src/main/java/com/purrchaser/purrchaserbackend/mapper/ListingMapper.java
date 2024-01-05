package com.purrchaser.purrchaserbackend.mapper;

import com.purrchaser.purrchaserbackend.domain.FavoriteListing;
import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import com.purrchaser.purrchaserbackend.dto.FavoriteListingDTO;
import com.purrchaser.purrchaserbackend.dto.ImageDTO;
import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import com.purrchaser.purrchaserbackend.dto.SellerDTO;
import com.purrchaser.purrchaserbackend.dto.TertiaryCategoryDTO;
import com.purrchaser.purrchaserbackend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListingMapper {

    private final ListingService listingService;

    public Page<ListingDTO> getAllListings(Pageable pageable) {
        Page<Listing> listings = listingService.getAllListings(pageable);
        return listings.map(this::convertToListingDTO);
    }

    public ListingDTO getListingById(Integer listingId) {
        Listing listing = listingService.getListingById(listingId);
        return convertToListingDTO(listing);
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

        // Map the main image of the listing
        ImageDTO mainImageDTO = ImageDTO.builder()
                .imageId(listing.getMainImage().getImageId())
                .listingId(listing.getListingId())
                .url(listing.getMainImage().getUrl())
                .build();

        // Fetch and map additional images, excluding the main image
        Integer mainImageId = listing.getMainImage().getImageId();
        List<ImageDTO> otherImagesDTOs = listingService.getImagesForListing(listing.getListingId()).stream()
                .filter(image -> !image.getImageId().equals(mainImageId)) // Exclude the main image
                .map(image -> ImageDTO.builder()
                        .imageId(image.getImageId())
                        .listingId(listing.getListingId())
                        .url(image.getUrl())
                        .build())
                .collect(Collectors.toList());

        TertiaryCategoryDTO tertiaryCategoryDTO = TertiaryCategoryDTO.builder()
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
                .mainImage(mainImageDTO)
                .images(otherImagesDTOs)
                .category(tertiaryCategoryDTO)
                .meetingLocation(listing.getMeetingLocation())
                .build();
    }

    public FavoriteListingDTO convertToFavoriteListingDTO(FavoriteListing favoriteListing) {
        return FavoriteListingDTO.builder()
                .favoriteListingId(favoriteListing.getFavoriteListingId())
                .userId(favoriteListing.getUser().getUserId())
                .listingId(favoriteListing.getListing().getListingId())
                .build();
    }

}