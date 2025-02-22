package com.uob.backend.service;

import com.uob.backend.dto.PlayerDTO;
import com.uob.backend.dto.ResponseDTO;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:11 PM
 **/

public interface PlayerService {
    ResponseDTO savePlayer(PlayerDTO dto);

    ResponseDTO getAllPlayers(int page, int size);

    ResponseDTO getPlayerById(Long playerId);
}
