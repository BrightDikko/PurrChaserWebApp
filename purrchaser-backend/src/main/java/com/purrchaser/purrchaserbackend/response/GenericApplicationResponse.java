package com.purrchaser.purrchaserbackend.response;

import lombok.Value;
import lombok.experimental.SuperBuilder;

@Value
@SuperBuilder
public class GenericApplicationResponse<T> {
    boolean success;
    String message;
    T data;
}
