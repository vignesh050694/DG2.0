package com.datagreen.report.dto;

import lombok.Data;

import java.util.List;

@Data
public class Dependency {
    private String childId;
    private String parentId;
    private List<String> depends;
}
