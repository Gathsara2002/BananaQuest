package com.uob.backend.controller;

import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.dto.SignInDTO;
import com.uob.backend.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:48 PM
 **/

@RestController
@CrossOrigin
@RequestMapping("/api/v1/sign-in")
@RequiredArgsConstructor
public class SignInController {

    private final SignInService signInService;

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> signInUser(@RequestBody SignInDTO dto) {
        ResponseDTO response = signInService.signInUser(dto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<ResponseDTO> getAllUsers() {
        ResponseDTO allUsers = signInService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }
}
