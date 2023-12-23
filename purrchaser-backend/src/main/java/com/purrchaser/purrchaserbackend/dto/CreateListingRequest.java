package com.purrchaser.purrchaserbackend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateListingRequest {
    @NotNull
    @NotNull(message = "Seller ID cannot be null")
    private Integer sellerId;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be less than 256 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    @NotBlank(message = "Item condition is required")
    private String itemCondition;

    private String brand;

    private String model;

    @NotBlank(message = "Main image URL is required")
    private String mainImageUrl;

    private List<@NotBlank(message = "Image URL cannot be blank") String> otherImagesUrls;

    @NotNull(message = "Category ID cannot be null")
    private Integer categoryId;

    @NotBlank(message = "Meeting location is required")
    private String meetingLocation;
}
