package com.purrchaser.purrchaserbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Integer tertiaryCategoryId;
    private String name;
    private Integer secondaryCategoryId;
}
