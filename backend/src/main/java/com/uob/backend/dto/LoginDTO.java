package com.uob.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Gathsara
 * created : 2/20/2025 -- 8:42 PM
 **/


@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class LoginDTO {
    private String password;
    private String username;
}
