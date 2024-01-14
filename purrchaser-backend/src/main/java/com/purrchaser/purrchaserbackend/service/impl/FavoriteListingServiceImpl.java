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

import java.util.List;
import java.util.Optional;

import static com.purrchaser.purrchaserbackend.constants.ErrorMessage.LISTING_NOT_FOUND_MESSAGE;
import static com.purrchaser.purrchaserbackend.constants.ErrorMessage.USER_NOT_FOUND_MESSAGE;
import static com.purrchaser.purrchaserbackend.constants.SuccessMessage.ADD_TO_FAVORITES_SUCCESS_MESSAGE;
import static com.purrchaser.purrchaserbackend.constants.SuccessMessage.GET_ALL_FAVORITES_SUCCESS_MESSAGE;
import static com.purrchaser.purrchaserbackend.constants.SuccessMessage.REMOVE_FROM_FAVORITES_SUCCESS_MESSAGE;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteListingServiceImpl implements FavoriteListingService {
    private final FavoriteListingRepository favoriteListingRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ListingMapper listingMapper;

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
            favoriteListingRepository.delete(existingFavoriteListing.get());

            return ApplicationResponseBuilder.buildResponse(true, REMOVE_FROM_FAVORITES_SUCCESS_MESSAGE);
        } else {
            throw new ApiRequestException("No Favorite Listing exists for the provided userId and listingId", HttpStatus.NOT_FOUND);
        }
    }


    @Override
    public GenericApplicationResponse<List<FavoriteListingDTO>> getAllFavoritesListingsForUser(Integer userId) {

        userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException(USER_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND));

        // Retrieve all favorite listings for the user
        List<FavoriteListing> favoriteListings = favoriteListingRepository.findByUser_UserId(userId);

        // Wrap in GenericApplicationResponse and return
        return ApplicationResponseBuilder.buildResponse(
                true,
                GET_ALL_FAVORITES_SUCCESS_MESSAGE,
                favoriteListings,
                listingMapper::convertToFavoriteListingDTO
        );

    }

}

