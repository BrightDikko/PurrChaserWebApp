package com.purrchaser.purrchaserbackend.response.base;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public abstract class ApplicationResponse {
    private final boolean success;
    private final String message;
}