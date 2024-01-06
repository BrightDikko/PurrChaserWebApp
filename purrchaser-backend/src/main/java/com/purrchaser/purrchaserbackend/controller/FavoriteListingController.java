package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.FavoriteListingDTO;
import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;
import com.purrchaser.purrchaserbackend.service.FavoriteListingService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoriteListingController {
    private final FavoriteListingService favoriteListingService;

    @PostMapping
    public ResponseEntity<GenericApplicationResponse<FavoriteListingDTO>> addListingToFavorites(
            @NotNull @RequestParam Integer userId,
            @NotNull @RequestParam Integer listingId
    ) {

        GenericApplicationResponse<FavoriteListingDTO> response = favoriteListingService.addListingToFavorites(userId, listingId);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping
    public ResponseEntity<GenericApplicationResponse<Void>> removeListingFromFavorites(
            @NotNull @RequestParam Integer userId,
            @NotNull @RequestParam Integer listingId
    ) {

        GenericApplicationResponse<Void> response = favoriteListingService.removeListingFromFavorites(userId, listingId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("all")
    public ResponseEntity<GenericApplicationResponse<List<FavoriteListingDTO>>> getAllFavoritesListingsForUser(
            @NotNull @RequestParam Integer userId
    ) {
        GenericApplicationResponse<List<FavoriteListingDTO>> response = favoriteListingService.getAllFavoritesListingsForUser(userId);
        return ResponseEntity.ok(response);
    }
}
