package com.purrchaser.purrchaserbackend.response.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public abstract class BaseResponse {
    private boolean success;
    private String message;
}
