package com.datagreen.report.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class FarmerDashboard {
    private String id;
    private String name;
    private Double lat;
    private Double lon;
}
