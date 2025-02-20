package com.uob.backend.service.impl;

import com.uob.backend.dto.PlayerDTO;
import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.entity.Player;
import com.uob.backend.repository.PlayerRepository;
import com.uob.backend.service.PlayerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:13 PM
 **/

@Service
@Transactional
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository repository;
    private final ModelMapper mapper;

    @Override
    public ResponseDTO savePlayer(PlayerDTO dto) {
        Optional<Player> player = repository.findBySignIn(dto.getDto().getId());
        if (player.isPresent()) {
            return new ResponseDTO("Player already exist!", "500", player.get());
        }
        Player mapped = mapper.map(dto, Player.class);
        Player save = repository.save(mapped);
        return new ResponseDTO("Player saved successfully!", "200", save);
    }
}
