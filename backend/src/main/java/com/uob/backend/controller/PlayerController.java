package com.uob.backend.controller;

import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.service.PlayerService;
import com.uob.backend.service.impl.PlayerServiceImpl;
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
    private final PlayerServiceImpl playerServiceImpl;

    @GetMapping("get-all")
    public ResponseEntity<ResponseDTO> getAllPlayers(@RequestParam int page,@RequestParam int size){
        ResponseDTO allPlayers = playerService.getAllPlayers(page, size);
        return new ResponseEntity<>(allPlayers, HttpStatus.OK);
    }

    @GetMapping("get-by-id")
    public ResponseEntity<ResponseDTO> getAllPlayers(@RequestParam Long playerId){
        ResponseDTO player = playerService.getPlayerById(playerId);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }
}
