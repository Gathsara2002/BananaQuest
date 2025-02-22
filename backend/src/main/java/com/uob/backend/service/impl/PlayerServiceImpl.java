package com.uob.backend.service.impl;

import com.uob.backend.dto.PlayerDTO;
import com.uob.backend.dto.ResponseDTO;
import com.uob.backend.entity.Player;
import com.uob.backend.repository.PlayerRepository;
import com.uob.backend.service.PlayerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        Optional<Player> player = repository.findBySignIn_Id(dto.getSignInDTO().getId());
        if (player.isPresent()) {
            return new ResponseDTO("Player already exist!", "500", player.get());
        }
        Player mapped = mapper.map(dto, Player.class);
        Player save = repository.save(mapped);
        return new ResponseDTO("Player saved successfully!", "200", save);
    }

    @Override
    public ResponseDTO getAllPlayers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Player> all = repository.findAll(pageable);
        if (all.isEmpty()) {
            return new ResponseDTO("No players to display!", "500", null);
        }
        ArrayList<PlayerDTO> list = new ArrayList<>();
        for (Player player : all) {
            PlayerDTO map = mapper.map(player, PlayerDTO.class);
            list.add(map);
        }
        return new ResponseDTO("Success", "200", list);
    }

    @Override
    public ResponseDTO getPlayerById(Long playerId) {
        Optional<Player> player = repository.findById(playerId);
        return player.map(value -> new ResponseDTO("Player", "200", value)).orElseGet(() -> new ResponseDTO("Player not exist!", "500", player.get()));
    }
}
