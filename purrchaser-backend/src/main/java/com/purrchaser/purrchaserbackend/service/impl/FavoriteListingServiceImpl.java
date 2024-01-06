package com.purrchaser.purrchaserbackend.service.impl;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import com.purrchaser.purrchaserbackend.domain.FavoriteListing;
import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.FavoriteListingDTO;
import com.purrchaser.purrchaserbackend.exceptions.ApiRequestException;
import com.purrchaser.purrchaserbackend.mapper.ListingMapper;
import com.purrchaser.purrchaserbackend.repository.FavoriteListingRepository;
import com.purrchaser.purrchaserbackend.repository.ListingRepository;
import com.purrchaser.purrchaserbackend.repository.UserRepository;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;
import com.purrchaser.purrchaserbackend.service.FavoriteListingService;
import com.purrchaser.purrchaserbackend.utils.ApplicationResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteListingServiceImpl implements FavoriteListingService {
    private final FavoriteListingRepository favoriteListingRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ListingMapper listingMapper;

    private final String ADD_TO_FAVORITES_SUCCESS_MESSAGE = "The listing was successfully added to the user's favorites.";
    private final String REMOVE_FROM_FAVORITES_SUCCESS_MESSAGE = "The listing was successfully removed from the user's favorites.";
    private final String USER_NOT_FOUND_MESSAGE = "User not found";
    private final String LISTING_NOT_FOUND_MESSAGE = "Listing with ID - %s was not found: ";

    @Override
    public GenericApplicationResponse<FavoriteListingDTO> addListingToFavorites(
            Integer userId,
            Integer listingId
    ) {
        // Check if the listing is already in the user's favorites
        Optional<FavoriteListing> existingFavoriteListing = favoriteListingRepository.findByUser_UserIdAndListing_ListingId(userId, listingId);

        if (existingFavoriteListing.isPresent()) {
            // If already in user's favorites, return the existing record
            return ApplicationResponseBuilder.buildResponse(
                    true,
                    ADD_TO_FAVORITES_SUCCESS_MESSAGE,
                    existingFavoriteListing.get(),
                    listingMapper::convertToFavoriteListingDTO);

        } else {
            // If not already in user's favorites, create and save a new FavoriteListing
            ApplicationUser user = userRepository.findById(userId)
                    .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND));

            Listing listing = listingRepository.findById(listingId)
                    .orElseThrow(() -> new ApiRequestException(String.format(LISTING_NOT_FOUND_MESSAGE, listingId), HttpStatus.NOT_FOUND));


            FavoriteListing newFavoriteListing = favoriteListingRepository.save(
                    FavoriteListing.builder()
                            .user(user)
                            .listing(listing)
                            .build()
            );

            return ApplicationResponseBuilder.buildResponse(
                    true,
                    ADD_TO_FAVORITES_SUCCESS_MESSAGE,
                    newFavoriteListing,
                    listingMapper::convertToFavoriteListingDTO);
        }
    }


    @Override
    public GenericApplicationResponse<Void> removeListingFromFavorites(
            Integer userId,
            Integer listingId
    ) {

        Optional<FavoriteListing> existingFavoriteListing = favoriteListingRepository.findByUser_UserIdAndListing_ListingId(userId, listingId);

        if (existingFavoriteListing.isPresent()) {
            userRepository.findById(userId)
                    .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND));

            listingRepository.findById(listingId)
                    .orElseThrow(() -> new ApiRequestException(String.format(LISTING_NOT_FOUND_MESSAGE, listingId), HttpStatus.NOT_FOUND));

            favoriteListingRepository.delete(existingFavoriteListing.get());

            return ApplicationResponseBuilder.buildResponse(true, REMOVE_FROM_FAVORITES_SUCCESS_MESSAGE);
        } else {
            throw new ApiRequestException("No Favorite Listing exists for the provided userId and listingId", HttpStatus.NOT_FOUND);
        }
    }

}

