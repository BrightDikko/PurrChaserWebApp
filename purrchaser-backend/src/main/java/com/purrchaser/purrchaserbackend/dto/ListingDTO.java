package com.purrchaser.purrchaserbackend.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import com.purrchaser.purrchaserbackend.domain.Image;
import com.purrchaser.purrchaserbackend.domain.TertiaryCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingDTO {
    private Integer listingId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private SellerDTO seller;
    private String title;
    private String description;
    private BigDecimal price;
    private Boolean isSold;
    private String itemCondition;
    private String brand;
    private String model;
    private ImageDTO image;
    private CategoryDTO category;
    private String meetingLocation;
}
