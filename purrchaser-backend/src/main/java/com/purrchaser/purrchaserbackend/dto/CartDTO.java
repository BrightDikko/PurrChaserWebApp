package com.purrchaser.purrchaserbackend.dto;

import com.purrchaser.purrchaserbackend.domain.Listing;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {

    private ListingDTO listing;

    private Integer quantity;

    private Timestamp addedAt;
}
