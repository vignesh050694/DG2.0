package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Page {
    private String id;
    private String title;
    private int pageIndex;
    private String cssClass;
    private Anchor anchor;
}
