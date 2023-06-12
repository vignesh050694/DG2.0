package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class FarmerLocationDTO {
    private String id;
    private Double latitude;
    private Double longitude;
    private String name;
}
