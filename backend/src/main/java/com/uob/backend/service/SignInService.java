package com.uob.backend.service;

import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.dto.SignInDTO;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:10 PM
 **/

public interface SignInService {
    SignInDTO signInUser(SignInDTO dto);

    ResponseDTO getAllUsers();

}
