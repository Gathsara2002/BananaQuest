package com.uob.backend.service.impl;

import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.dto.SignInDTO;
import com.uob.backend.entity.SignIn;
import com.uob.backend.repository.SignInRepository;
import com.uob.backend.service.SignInService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:12 PM
 **/

@Service
@Transactional
@RequiredArgsConstructor
public class SignInServiceImpl implements SignInService {

    private final SignInRepository repository;
    private final ModelMapper mapper;

    @Override
    public ResponseDTO signInUser(SignInDTO dto) {
        //check if user already exist using email.
        Optional<SignIn> user = repository.findByEmail(dto.getEmail());
        boolean isExist = user.isPresent();
        if (isExist) {
            return new ResponseDTO("Email already saved.User another one!", "500", user);
        }

        //save user
        SignIn signInUser = mapper.map(dto, SignIn.class);
        SignIn savedUser = repository.save(signInUser);
        return new ResponseDTO("User saved successfully!", "200", savedUser);
    }
}
