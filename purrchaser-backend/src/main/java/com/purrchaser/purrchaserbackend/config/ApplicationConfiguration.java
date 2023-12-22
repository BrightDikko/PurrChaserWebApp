package com.purrchaser.purrchaserbackend.config;

import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper;
    }
}
