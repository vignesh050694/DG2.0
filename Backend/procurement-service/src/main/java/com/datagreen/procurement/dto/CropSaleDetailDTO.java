package com.datagreen.procurement.dto;

import lombok.Data;

@Data
public class CropSaleDetailDTO {
    private String id;
    private int cropType;
    private GradeDTO grade;
    private String batchNo;
    private Double quantity;
}
