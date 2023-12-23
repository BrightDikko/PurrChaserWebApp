package com.purrchaser.purrchaserbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TertiaryCategoryDTO {
    private Integer tertiaryCategoryId;
    private String name;
}
