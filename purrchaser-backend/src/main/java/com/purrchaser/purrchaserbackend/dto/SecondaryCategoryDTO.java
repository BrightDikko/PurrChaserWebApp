package com.purrchaser.purrchaserbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecondaryCategoryDTO {
    private Integer secondaryCategoryId;
    private String name;
    private List<TertiaryCategoryDTO> tertiaryCategories;
}

