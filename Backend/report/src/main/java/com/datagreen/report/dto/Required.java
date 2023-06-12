package com.datagreen.report.dto;

import lombok.Data;

@Data
public class Required{
    private Boolean isRequired;
    private String errorMessage;
}
