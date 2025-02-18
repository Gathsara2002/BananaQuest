package com.uob.backend.service.impl;

import com.uob.backend.repository.PlayerRepository;
import com.uob.backend.service.PlayerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:13 PM
 **/

@Service
@Transactional
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository repository;
}
