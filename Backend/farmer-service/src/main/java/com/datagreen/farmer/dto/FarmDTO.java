package com.datagreen.farmer.dto;

import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class FarmDTO {
    private String id;
    private String name;
    private String nameOfInspector;
    private String pastureLand;
    private String ppArea;
    private String registrationNumber;
    private String surveyNo;
    private String conventionalCrops;
    private String conventionalLand;
    private String farmAddress;
    private Integer partTimeWorkers;
    private Integer fullTimeWorkers;
    private Integer seasonalWorkers;
    private Integer farmCount;
    private Double totalLandHolding;
    private Double latitude;
    private Double longitude;
    private Double estimatedYield;
    private Boolean isQualified;
    private Boolean isSameFarmer;

    private String conversionDateStr;
    private String lastDayStr;

    private String farmPhoto;

    private String approachRoad;
    private String conversionStatus;
    private String farmCertificate;
    private String fertilityStatus;
    private String irrigation;
    private String irrigationType;
    private String landGradient;
    private String landOwnership;
    private String topography;
    private BasicDTO farmer;

//    ----FarmCoordinatesDTO---

    private List<FarmCoordinatesDTO> coordinatesList;
}
