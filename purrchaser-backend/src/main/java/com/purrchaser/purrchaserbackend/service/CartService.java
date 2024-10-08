package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.dto.CartDTO;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;

import java.util.List;

public interface CartService {

    GenericApplicationResponse<CartDTO> addListingToUserCart(Integer userId, Integer listingId);

    GenericApplicationResponse<Void> removeListingFromUserCart(Integer userId, Integer listingId);

    GenericApplicationResponse<List<CartDTO>> getAllListingsInUserCart(Integer userId);
}
