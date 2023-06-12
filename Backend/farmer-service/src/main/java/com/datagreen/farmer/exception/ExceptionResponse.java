package com.datagreen.farmer.exception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExceptionResponse {
    private String message;
    private LocalDateTime dateTime;
}
