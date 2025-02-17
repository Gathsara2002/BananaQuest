package com.uob.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Gathsara
 * created : 2/17/2025 -- 9:50 PM
 **/

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class ResponseDTO {
    private String desc;
    private String code;
    private String timestamp;
    private Object result;
}
