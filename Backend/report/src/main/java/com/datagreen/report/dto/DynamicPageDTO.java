package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DynamicPageDTO {
    private Boolean isStepRequired;
    private List<Page> pages;
    private Map<String, Segment> segments;
}
