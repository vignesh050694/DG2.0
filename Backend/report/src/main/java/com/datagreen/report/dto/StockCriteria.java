package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class StockCriteria {
    private Boolean isChild;
    private List<String> columns;
    private String childTable;
}
