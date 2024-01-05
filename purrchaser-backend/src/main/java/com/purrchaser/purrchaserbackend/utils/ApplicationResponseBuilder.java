package com.purrchaser.purrchaserbackend.utils;

import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;

public class ApplicationResponseBuilder {

    // T => type of entity that being passed to the method
    // R => type of Data Transfer Object (DTO) that the entity will be converted into
    public static <T, R> GenericApplicationResponse<R> buildResponse(
            boolean success,
            String message,
            T entity,
            EntityMapper<T, R> mapper
    ) {

        R dto = mapper.map(entity);
        return GenericApplicationResponse.<R>builder()
                .success(success)
                .message(message)
                .data(dto)
                .build();
    }
}
