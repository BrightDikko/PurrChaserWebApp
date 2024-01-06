package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.dto.FavoriteListingDTO;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;

public interface FavoriteListingService {

    GenericApplicationResponse<FavoriteListingDTO> addListingToFavorites(Integer userId, Integer listingId);
    GenericApplicationResponse<Void> removeListingFromFavorites(Integer userId, Integer listingId);

}
