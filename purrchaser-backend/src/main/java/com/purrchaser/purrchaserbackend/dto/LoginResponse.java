package com.purrchaser.purrchaserbackend.dto;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private ApplicationUser user;
    private String token;
}