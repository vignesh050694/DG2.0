package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Section{
    private String id;
    private String title;
    private String type;
    private String cssClass;
    private List<Controls> controls;
}
