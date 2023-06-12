package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class StockFields {
    private String table;
    private String operation;
    private List<Fields> fields;
    private List<StockCriteria> criteria;
}
