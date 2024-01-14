package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.CartDTO;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;
import com.purrchaser.purrchaserbackend.service.CartService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/user/{userId}/listing/{listingId}")
    public ResponseEntity<GenericApplicationResponse<CartDTO>> addListingToUserCart(
            @PathVariable @NotNull Integer userId,
            @PathVariable @NotNull Integer listingId
    ) {

        GenericApplicationResponse<CartDTO> response = cartService.addListingToUserCart(userId, listingId);
        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/user/{userId}/listing/{listingId}")
    public ResponseEntity<GenericApplicationResponse<Void>> removeListingFromUserCart(
            @PathVariable @NotNull Integer userId,
            @PathVariable @NotNull Integer listingId
    ) {

        GenericApplicationResponse<Void> response = cartService.removeListingFromUserCart(userId, listingId);
        return ResponseEntity.ok(response);
    }
}
