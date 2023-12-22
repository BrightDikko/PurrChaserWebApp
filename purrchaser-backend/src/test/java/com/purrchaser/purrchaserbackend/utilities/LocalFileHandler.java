package com.purrchaser.purrchaserbackend.utilities;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.File;
import java.io.IOException;

public class LocalFileHandler {
    private final ObjectMapper mapper = new ObjectMapper();

    public LocalFileHandler() {
        // Register JavaTimeModule to handle Java 8 Date and Time API types
        mapper.registerModule(new JavaTimeModule());
    }

    public <T> T get (final String filePath, final Class<T> clazz) throws IOException {
        return mapper.readValue(new File(filePath), clazz);
    }
}
