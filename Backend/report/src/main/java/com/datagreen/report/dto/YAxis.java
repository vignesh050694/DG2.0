package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YAxis {
    private Integer min = 0;
    private ChartTitle title;
}
