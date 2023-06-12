package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class DynamicConfiguration {
    private String id;
    private String name;
    private String menu;
    private String rank;
    private boolean isStockMaintenance;
    private List<StockFields> stockFields;
    private List<String> datasource;
    private List<String> scopes;
    private DynamicPageDTO controls;
    private List<PostAction> postAction;
}
