package com.uob.backend.service;

import com.uob.backend.dto.PlayerDTO;
import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.entity.Player;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:11 PM
 **/

public interface PlayerService {
    ResponseDTO savePlayer(PlayerDTO dto);

    ResponseDTO getAllPlayers();

    ResponseDTO getPlayerById(Long playerId);

    ResponseDTO score(PlayerDTO dto);

    Player findByFkId(Long fkId);
}
