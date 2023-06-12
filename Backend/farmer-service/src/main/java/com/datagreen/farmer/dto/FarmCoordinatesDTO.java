package com.datagreen.farmer.dto;

import lombok.Data;

@Data
public class FarmCoordinatesDTO {
    private String id;
    private Double latitude;
    private Double longitude;
    private String sequenceNumber;
    private BasicDTO farm;

}
