package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.CartDTO;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;
import com.purrchaser.purrchaserbackend.service.CartService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.purrchaser.purrchaserbackend.constants.PathConstants.ALL;
import static com.purrchaser.purrchaserbackend.constants.PathConstants.CART;
import static com.purrchaser.purrchaserbackend.constants.PathConstants.USER_ID_AND_LISTING_ID_PATH_VARIABLES;

@RestController
@RequestMapping(CART)
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping(USER_ID_AND_LISTING_ID_PATH_VARIABLES)
    public ResponseEntity<GenericApplicationResponse<CartDTO>> addListingToUserCart(
            @PathVariable @NotNull Integer userId,
            @PathVariable @NotNull Integer listingId
    ) {

        GenericApplicationResponse<CartDTO> response = cartService.addListingToUserCart(userId, listingId);
        return ResponseEntity.ok(response);

    }

    @DeleteMapping(USER_ID_AND_LISTING_ID_PATH_VARIABLES)
    public ResponseEntity<GenericApplicationResponse<Void>> removeListingFromUserCart(
            @PathVariable @NotNull Integer userId,
            @PathVariable @NotNull Integer listingId
    ) {

        GenericApplicationResponse<Void> response = cartService.removeListingFromUserCart(userId, listingId);
        return ResponseEntity.ok(response);
    }

    @GetMapping(ALL)
    public ResponseEntity<GenericApplicationResponse<List<CartDTO>>> getAllListingsInUserCart(
            @RequestParam @NotNull Integer userId) {

        GenericApplicationResponse<List<CartDTO>> response = cartService.getAllListingsInUserCart(userId);
        return ResponseEntity.ok(response);

    }
}
