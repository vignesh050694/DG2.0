package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class GenericReportDTO {
    private String query;
    private String aggregate;
    private String countQuery;
    private List<String> displayCols;
    private List<String> definedCols;
    private List<FilterRequest> filter;
    private List<String> icons;
    private Boolean includeIsDelete = false;
    private String isDeletedKey;
    private Boolean isAddBtn = false;
    private String route;
}
