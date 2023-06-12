package com.datagreen.procurement.dto;

import lombok.Data;

@Data
public class ProcurementStockDTO {
    private String warehouse;
    private String grade;
    private Double noOfBags;
    private Double netWeight;
    private String branch;
}
