package com.purrchaser.purrchaserbackend.utils;

import com.purrchaser.purrchaserbackend.response.GenericResponse;

public class ApiResponseBuilder {

    public static <T, R> GenericResponse<R> buildResponse(
            boolean success,
            String message,
            T entity,
            EntityMapper<T, R> mapper
    ) {

        R dto = mapper.map(entity);
        return GenericResponse.<R>builder()
                .success(success)
                .message(message)
                .data(dto)
                .build();
    }
}
