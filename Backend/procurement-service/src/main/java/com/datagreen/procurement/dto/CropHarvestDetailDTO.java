package com.datagreen.procurement.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CropHarvestDetailDTO {
    private String id;
    int cropType;
    private GradeDTO grade;
    private Date sowingDate;
    private Double quantity;
}
