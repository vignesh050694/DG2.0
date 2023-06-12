package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class TableData {
    private String isEdit;
    private Map<String, Object> data;
}
