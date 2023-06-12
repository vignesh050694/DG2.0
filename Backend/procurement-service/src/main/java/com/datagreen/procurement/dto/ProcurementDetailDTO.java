package com.datagreen.procurement.dto;

import lombok.Data;

@Data
public class ProcurementDetailDTO {
    private String id;
    private GradeDTO grade;
    private Double noOfBags;
    private Double netWeight;
}
