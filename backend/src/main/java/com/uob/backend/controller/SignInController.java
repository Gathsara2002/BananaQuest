package com.uob.backend.controller;

import com.uob.backend.dto.LoginDTO;
import com.uob.backend.dto.PlayerDTO;
import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.dto.SignInDTO;
import com.uob.backend.service.PlayerService;
import com.uob.backend.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final PlayerService playerService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @PostMapping("/save")
    public ResponseEntity<SignInDTO> signInUser(@RequestBody SignInDTO dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        SignInDTO response = signInService.signInUser(dto);
        // If sign in success save player
        if (response.getId() != 0) {
            PlayerDTO playerDTO = new PlayerDTO();
            playerDTO.setScore(0);
            playerDTO.setSignInDTO(response);
            System.out.println(playerDTO);
            ResponseDTO responseDTO = playerService.savePlayer(playerDTO);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<ResponseDTO> getAllUsers() {
        ResponseDTO allUsers = signInService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> loginPlayer(@RequestBody LoginDTO loginDTO) {
        ResponseDTO dto = signInService.loginUser(loginDTO);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
