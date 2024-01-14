package com.purrchaser.purrchaserbackend.service.impl;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import com.purrchaser.purrchaserbackend.domain.Cart;
import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.CartDTO;
import com.purrchaser.purrchaserbackend.exceptions.ApiRequestException;
import com.purrchaser.purrchaserbackend.mapper.CartMapper;
import com.purrchaser.purrchaserbackend.repository.CartRepository;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;
import com.purrchaser.purrchaserbackend.service.CartService;
import com.purrchaser.purrchaserbackend.service.ListingService;
import com.purrchaser.purrchaserbackend.service.UserService;
import com.purrchaser.purrchaserbackend.utils.ApplicationResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.UUID;

import static com.purrchaser.purrchaserbackend.constants.ErrorMessage.CART_ITEM_NOT_FOUND_MESSAGE;
import static com.purrchaser.purrchaserbackend.constants.SuccessMessage.ADD_TO_CART_SUCCESS_MESSAGE;
import static com.purrchaser.purrchaserbackend.constants.SuccessMessage.REMOVE_FROM_CART_SUCCESS_MESSAGE;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final UserService userService;
    private final ListingService listingService;

    @Override
    public GenericApplicationResponse<CartDTO> addListingToUserCart(Integer userId, Integer listingId) {

        // Check if the listing already exists in the user's cart
        Optional<Cart> existingCart = cartRepository.findByUser_UserIdAndListing_ListingId(userId, listingId);

        if (existingCart.isPresent()) {

            // Item already in cart, return existing Cart Item
            return ApplicationResponseBuilder.buildResponse(
                    true,
                    ADD_TO_CART_SUCCESS_MESSAGE,
                    existingCart.get(),
                    cartMapper::convertToCartDTO
            );

        } else {
            // Create a new Cart Item
            ApplicationUser user = userService.getApplicationUserById(userId);
            Listing listing = listingService.getListingById(listingId);

            Cart newCartItem = Cart.builder()
                    .cartId(UUID.randomUUID().toString())
                    .user(user)
                    .listing(listing)
                    .quantity(1)
                    .addedAt(new Timestamp(System.currentTimeMillis()))
                    .build();

            Cart newlySavedCartItem = cartRepository.save(newCartItem);

            return ApplicationResponseBuilder.buildResponse(
                    true,
                    ADD_TO_CART_SUCCESS_MESSAGE,
                    newlySavedCartItem,
                    cartMapper::convertToCartDTO
            );
        }

    }

    @Override
    public GenericApplicationResponse<Void> removeListingFromUserCart(Integer userId, Integer listingId) {
        Optional<Cart> existingCartItem = cartRepository.findByUser_UserIdAndListing_ListingId(userId, listingId);

        if (existingCartItem.isPresent()) {
            cartRepository.delete(existingCartItem.get());

            return ApplicationResponseBuilder.buildResponse(
                    true,
                    REMOVE_FROM_CART_SUCCESS_MESSAGE
            );
        } else {
            throw new ApiRequestException(CART_ITEM_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
        }
    }
}
