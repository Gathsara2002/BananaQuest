package com.uob.backend.controller;

import com.uob.backend.dto.PlayerDTO;
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
@RequestMapping("/api/v1/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("get-all")
    public ResponseEntity<ResponseDTO> getAllPlayers() {
        ResponseDTO allPlayers = playerService.getAllPlayers();
        return new ResponseEntity<>(allPlayers, HttpStatus.OK);
    }

    @GetMapping("get-by-id")
    public ResponseEntity<ResponseDTO> getPlayerById(@RequestParam Long playerId) {
        ResponseDTO player = playerService.getPlayerById(playerId);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @PostMapping("score")
    public ResponseEntity<ResponseDTO> score(@RequestBody PlayerDTO dto) {
        ResponseDTO score = playerService.score(dto);
        return new ResponseEntity<>(score, HttpStatus.OK);
    }
}
