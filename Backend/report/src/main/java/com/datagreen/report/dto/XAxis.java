package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class XAxis {
    private String type;
    private List<String> categories;
}
