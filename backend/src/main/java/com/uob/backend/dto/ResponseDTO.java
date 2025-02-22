package com.uob.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

/**
 * @author : Gathsara
 * created : 2/17/2025 -- 9:50 PM
 **/

@NoArgsConstructor
@ToString
@Data
public class ResponseDTO {
    private String desc;
    private String code;
    private String timestamp;
    private Object result;

    public ResponseDTO(String desc, Object result) {
        this.desc = desc;
        this.result = result;
        this.timestamp = new Date().toString();
    }

    public ResponseDTO(String desc, String code, Object result) {
        this.desc = desc;
        this.code = code;
        this.result = result;
        this.timestamp = new Date().toString();
    }

    public ResponseDTO(String desc, String code, Object result, String timestamp) {
        this.desc = desc;
        this.code = code;
        this.result = result;
        this.timestamp = timestamp;
    }
}
