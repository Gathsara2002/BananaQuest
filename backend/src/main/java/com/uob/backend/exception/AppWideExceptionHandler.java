package com.uob.backend.exception;

import com.uob.backend.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

/**
 * @author : Gathsara
 * created : 2/17/2025 -- 9:47 PM
 **/

@RestControllerAdvice
@CrossOrigin
public class AppWideExceptionHandler {
    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ResponseDTO> handleException(RuntimeException e) {
        return new ResponseEntity<>(
                new ResponseDTO("An unexpected error occurred", "500", new Date().toString(), e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
