package com.purrchaser.purrchaserbackend.dto;

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
    private TertiaryCategoryDTO category;
    private String meetingLocation;
}
