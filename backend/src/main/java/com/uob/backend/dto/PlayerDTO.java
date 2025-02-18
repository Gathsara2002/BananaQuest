package com.uob.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Gathsara
 * created : 2/18/2025 -- 5:15 PM
 **/

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PlayerDTO {
    private Long playerId;
    private Long score;
    private SignInDTO dto;
}
