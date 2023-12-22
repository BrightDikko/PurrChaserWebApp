package com.purrchaser.purrchaserbackend.mapper;

import com.purrchaser.purrchaserbackend.domain.Listing;
import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import com.purrchaser.purrchaserbackend.service.ListingService;
import com.purrchaser.purrchaserbackend.utilities.LocalFileHandler;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

public class ListingMapperTest {

    private final String INPUT_TEST_LISTING_DATA_FILE_PATH = "src/test/resources/test-data/mapper/INPUT_basic_listing.json";
    private final String OUTPUT_TEST_LISTING_DTO_DATA_FILE_PATH = "src/test/resources/test-data/mapper/OUTPUT_basic_listing_dto.json";

    private LocalFileHandler fileHandler;

    @Mock
    private ListingService listingService;

    @InjectMocks
    private ListingMapper listingMapper;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = openMocks(this);
        fileHandler = new LocalFileHandler();
    }

    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
    }

    @Test
    public void testWhenGetAllListings() throws IOException {
        Pageable pageable = PageRequest.of(0, 1);

        Listing singleListing = fileHandler.get(INPUT_TEST_LISTING_DATA_FILE_PATH, Listing.class);
        ListingDTO expectedListingDTO = fileHandler.get(OUTPUT_TEST_LISTING_DTO_DATA_FILE_PATH, ListingDTO.class);

        // Mock the response from the ListingService
        List<Listing> singleListingList = Collections.singletonList(singleListing);
        Page<Listing> singleListingPage = new PageImpl<>(singleListingList, pageable, singleListingList.size());
        when(listingService.getAllListings(pageable)).thenReturn(singleListingPage);

        Page<ListingDTO> result = listingMapper.getAllListings(pageable);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());

        ListingDTO actualListingDTO = result.getContent().get(0);
        assertEquals(expectedListingDTO, actualListingDTO);
    }

    @Test
    public void testThatListingIsSuccessfullyConvertedToListingDTO() throws IOException {
        Listing inputListing = fileHandler.get(INPUT_TEST_LISTING_DATA_FILE_PATH, Listing.class);

        ListingDTO expectedListingDTO = fileHandler.get(OUTPUT_TEST_LISTING_DTO_DATA_FILE_PATH, ListingDTO.class);

        ListingDTO actualListingDTO = listingMapper.convertToListingDTO(inputListing);

        assertEquals(expectedListingDTO, actualListingDTO);
    }
}
