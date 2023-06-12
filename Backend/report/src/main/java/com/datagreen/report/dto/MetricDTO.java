package com.datagreen.report.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetricDTO {
    private String query;
    private String label;
    private String icon;
    private String linkTo;
    private Object value;
}
