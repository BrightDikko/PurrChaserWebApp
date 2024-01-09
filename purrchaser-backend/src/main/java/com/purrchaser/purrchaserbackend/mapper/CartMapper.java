package com.purrchaser.purrchaserbackend.mapper;

import com.purrchaser.purrchaserbackend.domain.Cart;
import com.purrchaser.purrchaserbackend.dto.CartDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartMapper {
    public final ListingMapper listingMapper;

    public CartDTO convertToCartDTO(Cart cart) {
        return CartDTO.builder()
                .listing(listingMapper.convertToListingDTO(cart.getListing()))
                .quantity(cart.getQuantity())
                .addedAt(cart.getAddedAt())
                .build();
    }
}
