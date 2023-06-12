package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BarChartDTO extends IChartDTO{
    private String type;
    private Chart chart;
    private ChartTitle title;
    private ChartTitle subtitle;
    @JsonProperty("xAxis")
    private XAxis xAxis;
    @JsonProperty("yAxis")
    private YAxis yAxis;
    private List<Series> series;
    private String query;
    private String  cssClass;

}
