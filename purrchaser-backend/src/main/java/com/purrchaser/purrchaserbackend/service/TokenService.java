package com.purrchaser.purrchaserbackend.service;

import org.springframework.security.core.Authentication;

public interface TokenService {
    String generateJwt(Authentication auth);
}
