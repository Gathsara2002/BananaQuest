package com.uob.backend.repository;

import com.uob.backend.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:09 PM
 **/

public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findBySignIn_Id(Long fkId);
}
