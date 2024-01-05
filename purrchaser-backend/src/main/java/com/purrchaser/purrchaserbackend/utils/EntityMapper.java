package com.purrchaser.purrchaserbackend.utils;

@FunctionalInterface  // The interface must have exactly one abstract method
public interface EntityMapper<T, R> {

    // Takes an entity and returns a DTO.
    R map(T entity);
}
