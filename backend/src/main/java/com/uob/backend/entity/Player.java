package com.uob.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : Gathsara
 * created : 2/17/2025 -- 9:36 PM
 **/

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "player")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerId;
    private Long score;
    @OneToOne
    @JoinColumn(name = "sign_in_id", nullable = false)
    private SignIn signIn;
}
