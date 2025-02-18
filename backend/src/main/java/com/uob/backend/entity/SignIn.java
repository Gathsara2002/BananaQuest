package com.uob.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : Gathsara
 * created : 2/17/2025 -- 9:31 PM
 **/

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "sign_in")
public class SignIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String username;
}
