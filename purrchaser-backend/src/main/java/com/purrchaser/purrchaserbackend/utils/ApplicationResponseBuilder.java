package com.purrchaser.purrchaserbackend.utils;

import com.purrchaser.purrchaserbackend.response.GenericApplicationResponse;

import java.util.List;
import java.util.stream.Collectors;

public class ApplicationResponseBuilder {

    public static <R> GenericApplicationResponse<R> buildResponse(
            boolean success,
            String message
    ) {
        return GenericApplicationResponse.<R>builder()
                .success(success)
                .message(message)
                .data(null)
                .build();
    }

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

    public static <T, R> GenericApplicationResponse<List<R>> buildResponse(
            boolean success,
            String message,
            List<T> entities,
            EntityMapper<T, R> mapper
    ) {
        List<R> dtos = entities.stream()
                .map(mapper::map)
                .collect(Collectors.toList());

        return GenericApplicationResponse.<List<R>>builder()
                .success(success)
                .message(message)
                .data(dtos)
                .build();
    }
}
