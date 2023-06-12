package com.datagreen.report.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterDTO {
    private String key;
    private String value;
    private String label;
    private Integer type;
    private List<FilterData> data;
}
