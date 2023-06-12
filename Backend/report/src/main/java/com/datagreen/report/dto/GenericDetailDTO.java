package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericDetailDTO {
    private List<String> query;
    private List<String> detailQuery;
    private List<Detail> data;
    private Map<String, String> aliases;
    private List<String> definedColumns;
    private List<List<Detail>> tableData;
}
