package com.purrchaser.purrchaserbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDTO {

    private Integer userId;
    private String firstName;
    private String lastName;
    private String profilePictureUrl;
    private Boolean isVerified;

}
