package com.uob.backend.controller;

import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:50 PM
 **/

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/player")
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("get-all")
    public ResponseEntity<ResponseDTO> getAllPlayers(@RequestParam int page,@RequestParam int size){
        ResponseDTO allPlayers = playerService.getAllPlayers(page, size);
        return new ResponseEntity<>(allPlayers, HttpStatus.OK);
    }
}
