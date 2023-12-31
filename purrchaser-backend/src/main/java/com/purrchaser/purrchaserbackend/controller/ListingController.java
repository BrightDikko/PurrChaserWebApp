package com.purrchaser.purrchaserbackend.controller;

import com.purrchaser.purrchaserbackend.dto.CreateListingRequest;
import com.purrchaser.purrchaserbackend.dto.ListingDTO;
import com.purrchaser.purrchaserbackend.mapper.ListingMapper;
import com.purrchaser.purrchaserbackend.s3.S3Buckets;
import com.purrchaser.purrchaserbackend.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/listings")
@RequiredArgsConstructor
public class ListingController {
    private final ListingMapper listingMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    @GetMapping("/all")
    public ResponseEntity<Page<ListingDTO>> getAllListings(@PageableDefault(size = 24)
                                                           @SortDefault.SortDefaults({
                                                                   @SortDefault(
                                                                           sort = "createdAt",
                                                                           direction = Sort.Direction.DESC
                                                                   )
                                                           })
                                                           Pageable pageable) {
        return ResponseEntity.ok(listingMapper.getAllListings(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDTO> getListingById(@PathVariable Integer id) {
        System.out.println("Received request to getListingById. id: " + id);
        ListingDTO listingDTO = listingMapper.getListingById(id);
        if (listingDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        System.out.println("listingDTO to be returned: " + listingDTO);
        return ResponseEntity.ok(listingDTO);
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ListingDTO> createListing(
            @RequestParam("sellerId") Integer sellerId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("itemCondition") String itemCondition,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("mainImage") MultipartFile mainImage,
            @RequestParam(value = "otherImages", required = false) List<MultipartFile> otherImages,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("meetingLocation") String meetingLocation
    ) {

        System.out.println("\nmainImage: " + mainImage);
        // Convert the received parameters into a CreateListingRequest object
        CreateListingRequest createListingRequest = CreateListingRequest.builder()
                .sellerId(sellerId)
                .title(title)
                .description(description)
                .price(price)
                .itemCondition(itemCondition)
                .brand(brand)
                .model(model)
                .mainImageUrl(storeImage(sellerId, mainImage))
                .otherImagesUrls(storeImages(sellerId, otherImages))
                .categoryId(categoryId)
                .meetingLocation(meetingLocation)
                .build();

        System.out.println("\ncreateListingRequest: " + createListingRequest);
        ListingDTO listingDTO = listingMapper.createListing(createListingRequest);
        System.out.println("\nlistingDTO: " + listingDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(listingDTO);
    }

    private String storeImage(Integer sellerId, MultipartFile imageFile) {
        String listingImageId = UUID.randomUUID().toString();
        String objectKey = "listing-images/%s/%s".formatted(sellerId, listingImageId);
        String contentType = imageFile.getContentType(); // Get the MIME type
        System.out.println("contentType: " + contentType);

        try {
            s3Service.putObject(s3Buckets.getListings(), objectKey, imageFile.getBytes(), contentType);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("url: " + s3Service.generateS3Url(s3Buckets.getListings(), objectKey));
        return s3Service.generateS3Url(s3Buckets.getListings(), objectKey);
    }


    private List<String> storeImages(Integer sellerId, List<MultipartFile> images) {
        if (images == null) {
            return Collections.emptyList(); // Return an empty list if images is null
        }

        return images.stream().map(image -> {
            String listingImageId = UUID.randomUUID().toString();
            String objectKey = "listing-images/%s/%s".formatted(sellerId, listingImageId);
            String contentType = image.getContentType();

            try {
                s3Service.putObject(s3Buckets.getListings(), objectKey, image.getBytes(), contentType);
                return s3Service.generateS3Url(s3Buckets.getListings(), objectKey);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

}
