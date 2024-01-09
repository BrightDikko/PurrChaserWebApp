package com.purrchaser.purrchaserbackend.service;

import com.purrchaser.purrchaserbackend.domain.ApplicationUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService {

    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;
    ApplicationUser getApplicationUserById(Integer userId);

}
