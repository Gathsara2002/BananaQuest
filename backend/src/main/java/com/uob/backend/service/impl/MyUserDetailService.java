package com.uob.backend.service.impl;

import com.uob.backend.entity.SignIn;
import com.uob.backend.entity.UserPrincipal;
import com.uob.backend.repository.SignInRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author : Gathsara
 * created : 3/13/2025 -- 5:25 PM
 **/

@Service
@RequiredArgsConstructor
public class MyUserDetailService implements UserDetailsService {

    private final SignInRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SignIn user = repository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(user);
    }
}
