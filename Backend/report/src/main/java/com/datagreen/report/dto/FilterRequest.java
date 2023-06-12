package com.datagreen.report.dto;

import lombok.Data;

@Data
public class FilterRequest {
    private Integer type;
    private String query;
    private String name;
    private String label;
}
