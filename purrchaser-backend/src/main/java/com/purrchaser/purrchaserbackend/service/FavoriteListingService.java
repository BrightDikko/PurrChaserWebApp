package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.dto.FavoriteListingDTO;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;

import java.util.List;

public interface FavoriteListingService {

    GenericApplicationResponse<FavoriteListingDTO> addListingToFavorites(Integer userId, Integer listingId);

    GenericApplicationResponse<Void> removeListingFromFavorites(Integer userId, Integer listingId);

    GenericApplicationResponse<List<FavoriteListingDTO>> getAllFavoritesListingsForUser(Integer userId);
}
