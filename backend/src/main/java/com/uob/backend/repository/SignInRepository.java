package com.uob.backend.repository;

import com.uob.backend.entity.SignIn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:09 PM
 **/

public interface SignInRepository extends JpaRepository<SignIn, Long> {

    Optional<SignIn> findByEmail(String email);
}
