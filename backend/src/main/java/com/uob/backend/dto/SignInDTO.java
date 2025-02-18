package com.uob.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:14 PM
 **/

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class SignInDTO {
    private Long id;
    private String email;
    private String password;
    private String username;
}
