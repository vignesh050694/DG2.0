package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaginationDTO {
    private Integer draw;
    private Integer pageNo;
    private Integer pageSize;
    private String report;
    private List<SearchCriteria> filter;
}
